import React, { memo, useState } from "react";
import { classNames } from "../../utils/helpers";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import PrimaryButtonAlt from "../buttons/PrimaryButtonAlt";
import Image from "next/image";

const style = {
  card: {
    container: "hidden md:h-fit md:block md:absolute md:right-0 md:mr-[20px] xl:mr-[80px] md:mt-[120px] rounded-[32px] w-[320px] min-h-[120px] bg-[#252525] shadow-lg z-[20]",
  },

  container: "flex flex-col space-y-[8px] first:pt-[0px] py-[24px] last:pb-[0px]",
  divider: "divide-y divide-[#3F3F3F]",
  title: "text-body2 truncate",
  spaceBetween: "flex justify-between",
  contentText: "text-body3",
  contentTitle: "text-[#757575]",
  emptyMessage: "text-body2 text-[#757575]",

  skeleton: {
    appearance: "h-[16px] bg-[#3F3F3F] rounded",
  },

  contractList: {
    margin: "mx-[24px] my-[32px]",
    newContractButton: {
      size: "w-full h-[40px]",
    },
  },
};

export default function WalletBlock() {
  const router = useRouter();
//   const { address } = useAccount();
  const address = '0xb02E431a15fEf38e2E580C3Ef9eA6Fa906D37185';

  return (
    <>
        {address ? 
            <div className={style.card.container}>
                <div className={classNames(style.contractList.margin, "space-y-[28px]")}>
                    {/* Title */}
                    <p className="text-h4-poppins">Your Wallet</p>
                    <hr className="my-[40px] border-[#3F3F3F]" />
                    
                    {/* Wallet address */}
                    <div className="flex flex-row items-center justify-between p-[10px] bg-[#1C1C1C] rounded-[8px]">
                        <p className="text-body3 overflow-hidden overflow-ellipsis max-w-[90%]">{address}</p>
                        <div className="relative w-[24px] h-[24px]">
                            <Image
                                src={"/icons/Ic_copy_white.svg"}
                                alt="avatar"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        </div>
                    </div>

                    {/* New Contract Button */}
                    <PrimaryButtonAlt
                    onClick={() => {alert('Hello')}}
                    className="w-[100%] h-[40px] font-poppins text-[14px] font-normal"
                    >
                    <span>DISCONNECT WALLET</span>
                    </PrimaryButtonAlt>
                </div>
            </div>
        :
            null
        }
    </>
  );
}
