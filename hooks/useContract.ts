import ArbitrableEscrowFactoryABI from "../components/web3/contracts/ArbitrableEscrowFactory.json";
import ArbitrableEscrowABI from "../components/web3/contracts/ArbitrableEscrow.json";
import ERC20 from "../components/web3/contracts/ERC20.json";
import { BUSD } from "../utils/constants/tokens";

import {
  useContractEvent,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import { ethers } from "ethers";
import { SupportedChainId } from "../utils/constants/chains";
import { useRecoilValue } from "recoil";
import { isContractDetailEnabledState } from "../recoil/contractReads/atom";
import { useEffect } from "react";

export const useArbitrableEscrowFactoryConfig = (
  functionName: string,
  args?: any | any[]
) => {
  const contractAddress = process.env.escrowFactoryAddress || "";

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowFactoryABI,
    functionName,
    args,
  });

  return config;
};

export const useArbitrableEscrowConfig = (
  contractAddress: string,
  functionName: string,
  args?: any | any[],
  overrides?: any,
  onError?: any
) => {
  return usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    functionName,
    args,
    overrides,
    onError,
  });
};

export const useApproval = (
  tokenAddress: string | undefined,
  contractAddress: string,
  amount: any,
  onApproval: () => void,
  onError?: () => void
) => {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? "56";

  const { config } = usePrepareContractWrite({
    addressOrName: tokenAddress || BUSD[chainId as SupportedChainId].address,
    contractInterface: ERC20,
    functionName: "approve",
    args: [contractAddress, String(amount)],
  });

  const {
    isLoading: isApprovalLoading,
    write,
    data,
  } = useContractWrite({
    ...config,

    onError,
  });

  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: onApproval,
  });

  return {
    isFetching: isApprovalLoading || isTransactionLoading,
    write,
  };
};

export const useAllowedBalance = (
  tokenAddress: string | undefined,
  ownerAddress: string | undefined,
  contractAddress: string
) => {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? "56";

  const res = useContractRead({
    addressOrName: tokenAddress || BUSD[chainId as SupportedChainId].address,
    contractInterface: ERC20,
    functionName: "allowance",
    // cacheOnBlock: true,
    staleTime: 1_000,
    cacheTime: 120_000,
    // watch: true,
    args: [ownerAddress, contractAddress],
  });

  return res;
};

export const useAllowance = (
  tokenAddress: string | undefined,
  ownerAddress: string,
  contractAddress: string,
  onSuccess?: () => void
) => {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? "56";

  return useContractRead({
    addressOrName: tokenAddress || BUSD[chainId as SupportedChainId].address,
    contractInterface: ERC20,
    functionName: "allowance",
    args: [ownerAddress, contractAddress],
    // cacheOnBlock: true,
    // watch: true,
    // cacheTime: 5_000,
    staleTime: 1_000,
    cacheTime: 120_000,
    onSuccess,
  });
};

export const useContractDetail = (
  ownerAddress: string | undefined,
  contractAddress: string,
  watch?: boolean
  // enabled?: boolean
) => {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? "56";

  const enabled = useRecoilValue(isContractDetailEnabledState);

  const res = useContractReads({
    watch,
    enabled,
    staleTime: 10_000,
    cacheTime: 120_000,
    // cacheOnBlock: true,
    // cacheTime: 5_000,
    contracts: [
      {
        addressOrName: contractAddress,
        contractInterface: ArbitrableEscrowABI,
        functionName: "funds",
        args: [
          ownerAddress,
          // process.env.NEXT_PUBLIC_EMPTY_ADDRESS,
          BUSD[chainId as SupportedChainId]?.address,
          // process.env.APP_ENV === "production"
          //   ? BUSD_MAINNET.address
          //   : BUSD_TESTNET.address,
        ],
      },
      // {
      //   addressOrName: contractAddress,
      //   contractInterface: ArbitrableEscrowABI,
      //   functionName: "funds",
      //   args: [process.env.NEXT_PUBLIC_EMPTY_ADDRESS, process.env.APP_ENV === "production" ? BUSD_MAINNET.address : BUSD_TESTNET.address],
      // },
    ],
  });

  return res;
};

export const useRole = (
  ownerAddress: string | undefined,
  contractAddress: string
) => {
  const roleRes = useContractReads({
    staleTime: Infinity,
    cacheTime: Infinity,
    contracts: [
      {
        addressOrName: contractAddress,
        contractInterface: ArbitrableEscrowABI,
        functionName: "CREATOR_ROLE", // ROLE 자체의 주소임
      },
      {
        addressOrName: contractAddress,
        contractInterface: ArbitrableEscrowABI,
        functionName: "FUNDER_ROLE", // ROLE 자체의 주소임
      },
      {
        addressOrName: contractAddress,
        contractInterface: ArbitrableEscrowABI,
        functionName: "PAYEE_ROLE", // ROLE 자체의 주소임
      },
    ],
  });

  const res = useContractReads({
    // cacheOnBlock: true,
    // cacheTime: 5_000,
    // watch: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    contracts: [
      {
        addressOrName: contractAddress,
        contractInterface: ArbitrableEscrowABI,
        functionName: "hasRole",
        args: [roleRes?.data?.[0] ?? "", ownerAddress],
      },
      {
        addressOrName: contractAddress,
        contractInterface: ArbitrableEscrowABI,
        functionName: "hasRole",
        args: [roleRes?.data?.[1] ?? "", ownerAddress],
      },
      {
        addressOrName: contractAddress,
        contractInterface: ArbitrableEscrowABI,
        functionName: "hasRole",
        args: [roleRes?.data?.[2] ?? "", ownerAddress],
      },
    ],
  });

  return res;
};

export const useCandidates = (
  contractAddress: string,
  onSuccess?: () => void
) => {
  return useContractRead({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    functionName: "payeeCandidates",
    // cacheOnBlock: true,
    // // watch: true,
    // cacheTime: 5_000,
    watch: true,
    staleTime: 1_000,
    cacheTime: 120_000,
    onSuccess,
    onError(error) {
      console.log("Candidates Error", error);
    },
  });
};

export const useReadCandidates = (
  contractAddress: string,
  candidatesAddresses: string[] | any,
  onSuccess?: () => void,
  enabled?: boolean
) => {
  const res = useContractReads({
    enabled,
    cacheTime: 120_000,
    contracts: candidatesAddresses
      ? candidatesAddresses?.map?.((candidatesAddress: string | any) => ({
          addressOrName: contractAddress,
          contractInterface: ArbitrableEscrowABI,
          functionName: "candidatesIdentifier",
          args: [candidatesAddress],
          onSuccess,
          onError(error: any) {
            console.log("Candidates Error", error);
          },
        }))
      : [],
  });

  useEffect(() => {
    if (enabled && res) {
      const timer = setInterval(async () => {
        await res.refetch();
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [enabled, res]);

  return res;
};

export const useRegisterCandidate = (
  contractAddress: string,
  identifier: string,
  onSuccess?: () => void,
  onError?: () => void,
  onEvent?: () => void
) => {
  const { config } = useArbitrableEscrowConfig(
    contractAddress,
    "registerAsPayee",
    ethers.utils.formatBytes32String(identifier)
  );

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: ArbitrableEscrowABI,
    eventName: "PayeeCandidateRegistered",
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
