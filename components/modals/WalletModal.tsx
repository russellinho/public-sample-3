import { Fragment, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useDisconnect } from "wagmi";

export default function WalletModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const { disconnect } = useDisconnect();

  const handleSignOut = useCallback(async () => {
    disconnect();
    signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
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

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="flex justify-center items-center w-full min-h-full p-8 text-center">
              <Dialog.Panel className="relative w-full max-w-sm">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute -bottom-[64px] left-1/2 -translate-x-1/2">
                    <button
                      type="button"
                      className="flex items-center justify-center h-10 w-10 rounded-full outline-none ring-2 ring-inset ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <section className="relative px-[20px] py-[40px] w-full bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
                  <div className="mb-8">
                    <p className="font-bold text-left text-[18px] leading-[21px]">
                      YOUR WALLET
                    </p>
                  </div>
                  <hr />
                  <div className="mt-[32px] text-left">
                    <p className="mb-[12px] font-bold text-[#A5A5A7] text-[13px] leading-[18px]">
                      YOUR ADDRESS
                    </p>

                    <div className="mb-3 p-3 w-full flex items-center bg-[#F4F6F8] rounded-lg">
                      <p className="mr-2 truncate">
                        0xfCA94C81326B27A82ed77fB3Bf3823C490708932
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            "0xfCA94C81326B27A82ed77fB3Bf3823C490708932"
                          )
                        }
                      >
                        <div className="relative w-[24px] h-[24px]">
                          <Image
                            src="/icons/Ic_copy.svg"
                            alt="ic_copy"
                            layout="fill"
                          />
                        </div>
                      </button>
                    </div>

                    <button
                      className="w-full h-[48px] bg-white border border-[#DEE0E8] rounded-xl
                    font-bold text-[14px] leading-[17px]"
                      onClick={() => handleSignOut()}
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                </section>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
