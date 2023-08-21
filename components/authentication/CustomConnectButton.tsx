/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function CustomConnectButton({
  responsive,
  stretch,
}: {
  responsive?: boolean;
  stretch?: boolean;
}) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                position: "relative",
                opacity: 0,
                zIndex: 10,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={`flex justify-center items-center bg-secondary-gradient text-gray-900 uppercase
                        ${
                          responsive
                            ? "w-[40px] h-[40px] rounded-[28px] md:w-[200px] md:h-[40px] md:rounded-[40px]"
                            : "w-[200px] h-[40px] rounded-[40px]"
                        }
                        font-medium text-btn4
                    `}
                  >
                    <div className="relative md:hidden xl:hidden w-[24px] h-[24px]">
                      <Image
                        src={"/icons/Ic_wallet.svg"}
                        alt="wallet"
                        layout="fill"
                      />
                    </div>
                    <div className="hidden md:block">Connect Wallet</div>
                  </button>
                );
              }

              return (
                <div className="flex gap-3">
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={`flex justify-center items-center bg-secondary-gradient text-gray-900 uppercase
                        ${
                          responsive
                            ? "w-[40px] h-[40px] rounded-[28px] md:min-w-[160px] md:h-[40px] md:rounded-[40px]"
                            : "min-w-[160px] h-[40px] rounded-[40px]"
                        } ${stretch ? "w-[200px]" : ""}
                        font-medium text-btn4
                    `}
                  >
                    <div className="relative w-[24px] h-[24px]">
                      <Image
                        src={"/icons/Ic_wallet.svg"}
                        alt="wallet"
                        layout="fill"
                      />
                    </div>
                    <span
                      className={`${
                        responsive ? "hidden md:block md:ml-2" : "ml-2"
                      }`}
                    >
                      {account.displayName}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
