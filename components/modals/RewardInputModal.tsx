/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalLoader from "../loadings/ModalLoader";
import { toast } from "react-hot-toast";
import PrimaryButton from "../buttons/PrimaryButton";
import TokenInput from "../inputs/TokenInput";
import { ethers } from "ethers";
import { useDeposit } from "../../hooks/useEscrow";
import { useSetRecoilState } from "recoil";
import { isContractDetailEnabledState } from "../../recoil/contractReads/atom";
import { BUSD } from "../../utils/constants/tokens";
import { SupportedChainId } from "../../utils/constants/chains";
import { Token } from "@uniswap/sdk-core";
import { useRouter } from "next/router";
import axios from "axios";

const DepositButton = ({
  contractAddress,
  tokenAddress,
  amount,
  isLoading,
  setIsLoading,
  setOpen,
}: {
  contractAddress: string;
  tokenAddress: string | Token;
  amount: string;
  isLoading: boolean;
  setIsLoading: any;
  setOpen: any;
}) => {
  const setIsContractDetailEnabledState = useSetRecoilState(
    isContractDetailEnabledState
  );

  const [realAmount, setRealAmount] = useState<string>("");

  const {
    isLoading: isDepositLoading,
    data,
    write: deposit,
  } = useDeposit(
    contractAddress,
    tokenAddress,
    ethers.utils.parseEther(realAmount || "1"),
    undefined,
    () => {setOpen(false)}
  );

  useEffect(() => {
    setIsLoading(isDepositLoading);
  }, [isDepositLoading, setIsLoading]);

  useEffect(() => {
    if (realAmount && deposit) {
      deposit?.();
      setIsContractDetailEnabledState(false);
    }
  }, [deposit, realAmount, setIsContractDetailEnabledState]);

  useEffect(() => {
    if (data && !isLoading) {
      axios
        .patch("/api/events/" + contractAddress, {
          reward: Number(realAmount) || 1,
        })
        .then((res) => {
          toast.success("Deposit Success");
          setOpen(false);
          setIsContractDetailEnabledState(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [setOpen, data, isLoading, setIsContractDetailEnabledState]);

  return (
    <PrimaryButton
      className="max-w-[310px] md:max-w-[320px]"
      disabled={isNaN(Number(amount)) || Number(amount) <= 0}
      onClick={() => {
        if (!isLoading) {
          setRealAmount(amount);
          // deposit?.();
          // setIsContractDetailEnabledState(false);
        }
      }}
    >
      {isLoading ? "Depositing.." : "Deposit"}
    </PrimaryButton>
  );
};

export default function RewardInputModal({
  open,
  setOpen,
  rewardAmount,
  setRewardAmount,
}: {
  open: boolean;
  setOpen: any;
  rewardAmount: string;
  setRewardAmount: any;
}) {
  const router = useRouter();

  const { pid } = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID ?? 97;

  const tokenAddress = BUSD[chainId as SupportedChainId].address;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          {isLoading && <ModalLoader />}
          <div className="flex justify-center items-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative px-[24px] py-[52px] w-[500px]
                bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all"
              >
                <section className="flex flex-col justify-center items-center gap-[32px]">
                  <p className="text-h2-poppins font-bold text-white">
                    Total Reward
                  </p>
                  <TokenInput
                    label={""}
                    name="totalReward"
                    placeholder={"0"}
                    decimals={0}
                    tokenAmount={rewardAmount}
                    overflow={false}
                    updateTokenAmount={setRewardAmount}
                    allowTokenSelection={true}
                    allowInput={true}
                  />
                  {rewardAmount &&
                  !isNaN(Number(rewardAmount)) &&
                  Number(rewardAmount) >= 0 ? (
                    <DepositButton
                      contractAddress={pid as string}
                      tokenAddress={tokenAddress}
                      amount={rewardAmount}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      setOpen={setOpen}
                    />
                  ) : (
                    <PrimaryButton
                      className="max-w-[310px] md:max-w-[320px]"
                      disabled
                    >
                      Deposit
                    </PrimaryButton>
                  )}
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
