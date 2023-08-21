import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

import { fetchEscrowsOf } from "../utils/services/fetchEscrowsOf";
import ArbitrableEscrowFactoryABI from "../components/web3/contracts/ArbitrableEscrowFactory.json";
import ArbitrableEscrowABI from "../components/web3/contracts/ArbitrableEscrow.json";
import { useArbitrableEscrowConfig } from "./useContract";
import { BigNumber } from "ethers";
import { BUSD } from "../utils/constants/tokens";
import { SupportedChainId } from "../utils/constants/chains";
import { escrowState } from "../recoil/escrow/escrowState";
import { useSetRecoilState } from "recoil";

export const useEscrow = () => {
  const { address } = useAccount();
  const [escrows, setEscrows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    const result = await fetchEscrowsOf(address);
    setEscrows(result);
    setIsLoading(false);
  }, [address]);

  useEffect(() => {
    if (address) refresh();
  }, [address, refresh]);

  useContractEvent({
    addressOrName: process.env.escrowFactoryAddress!,
    contractInterface: ArbitrableEscrowFactoryABI,
    eventName: "EscrowCreated",
    listener: (event) => {
      console.log(`FromFactory: ${process.env.escrowFactoryAddress!}`, event);
      refresh();
    },
  });

  return { refresh, escrows, isLoading };
};

export const useDeposit = (
  contractAddress: string,
  tokenAddress: string | any,
  amount: BigNumber,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? "97";

  const [isTxDone, setIsTxDone] = useState<boolean>(false);

  const { config } = useArbitrableEscrowConfig(contractAddress, "deposit", [
    tokenAddress || BUSD[chainId as SupportedChainId].address,
    amount,
  ]);

  const {
    isLoading: isDepositLoading,
    write,
    data,
  } = useContractWrite({
    ...config,

    onSuccess() {
      setIsTxDone(false);
    },
    onError,
  });

  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    enabled: !isDepositLoading,
    hash: data?.hash,
    onSuccess: () => {
      setIsTxDone(true);
      onSuccess?.();
    },
    onError: () => {
      setIsTxDone(true);
      onError?.();
    },
  });

  return {
    data,
    isLoading: isDepositLoading || (isTransactionLoading && !isTxDone),
    write,
  };
};

export const useWithdraw = (
  contractAddress: string,
  onSuccess?: () => void,
  onError?: () => void,
  onEvent?: () => void
) => {
  const { config } = useArbitrableEscrowConfig(contractAddress, "withdraw");

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    eventName: "Withdrawn",
    listener: (event) => {
      console.log(event);
      onEvent?.();
    },
    once: true,
  });

  return useContractWrite({
    ...config,
    onSuccess,
    onError,
  });
};

export const useSettle = (
  contractAddress: string,
  autoWithdraw: boolean,
  onSuccess?: () => void,
  onError?: () => void,
  onEvent?: () => void
) => {
  const { config } = useArbitrableEscrowConfig(
    contractAddress,
    "settle",
    autoWithdraw
  );

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    eventName: "ContractFinalized",
    listener: (event) => {
      console.log(event);
      onEvent?.();
    },
    once: true,
  });

  return useContractWrite({
    ...config,
    onSuccess,
    onError,
  });
};

export const useActivate = (
  contractAddress: string,
  onSuccess?: () => void,
  onError?: () => void,
  onEvent?: () => void
) => {
  const { config } = useArbitrableEscrowConfig(
    contractAddress,
    "activateContract"
  );

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    eventName: "ContractActivated",
    listener: (event) => {
      console.log(event);
      onEvent?.();
    },
    once: true,
  });

  return useContractWrite({
    ...config,

    onSuccess,

    onError,
  });
};

export const useGrantPayeeRole = (
  contractAddress: string,
  payeeAddresses: string[],
  onSuccess?: () => void,
  onError?: () => void
) => {
  const { config } = useArbitrableEscrowConfig(
    contractAddress,
    "grantPayeeRole",
    [payeeAddresses]
  );

  return useContractWrite({
    ...config,

    onSuccess,
    onError,
  });
};

export const useFunders = (contractAddress: string) => {
  return useContractRead({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    functionName: "funders",
    // watch: true,
    // cacheOnBlock: true,
    staleTime: 10_000,
    cacheTime: 120_000,
    onError(error) {
      console.log("Error", error);
    },
  });
};

export const usePayees = (contractAddress: string) => {
  return useContractRead({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    functionName: "payees",
    watch: true,
    // cacheOnBlock: true,
    // staleTime: 10_000,
    // cacheTime: 120_000,
    onError(error) {
      console.log("Error", error);
    },
  });
};

export const useEscrowState = (
  contractAddress: string,
  authRefetch: boolean = true,
  refetchInterval: number = 5000
) => {
  const setEscrowState = useSetRecoilState(escrowState);

  const res = useContractRead({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    functionName: "state",
    // watch: true,
    // cacheOnBlock: true,
    // staleTime: 1_000,
    // cacheTime: 120_000,
    onSuccess(data) {
      if (!isNaN(Number(data))) {
        setEscrowState(Number(data));
      }
    },
    onError(error) {
      setEscrowState(Number(0));
      console.log("Error", error);
    },
  });

  useEffect(() => {
    if (authRefetch && refetchInterval && res) {
      const timer = setInterval(async () => {
        await res.refetch();
      }, refetchInterval);

      return () => clearInterval(timer);
    }
  }, [authRefetch, refetchInterval, res]);

  return res;
};

export const useFundingState = (
  contractAddress: string,
  ownerAddress: string
) => {
  return useContractRead({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    functionName: "funderExist",
    args: ownerAddress,
    // watch: true,
    // cacheOnBlock: true,
    staleTime: 10_000,
    cacheTime: 120_000,
    onError(error) {
      console.log("Error", error);
    },
  });
};
