/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ModalLoader from "../loadings/ModalLoader";
import TextInput from "../inputs/TextInput";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import PrimaryButton from "../buttons/PrimaryButton";

export default function ConfirmModal({
  message,
  image,
  open,
  setOpen,
  onConfirm,
}: {
  message: string;
  image?: string;
  open: boolean;
  setOpen: any;
  onConfirm: any;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, session } = useAuth();

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
                className="relative px-[24px] py-[36px] w-full max-w-[560px]
                bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all"
              >
                <section className="flex flex-col justify-center items-center">
                  <p className="text-h5-poppins md:text-h2-poppins text-white">
                    {message}
                  </p>
                  {image && (
                    <div>
                      <Image src={image} alt="img" width={144} height={104} />
                    </div>
                  )}
                  <div className="mt-[48px] w-full grid grid-cols-2 gap-4">
                    <button
                      className="w-full h-[48px] rounded-[8px] border border-white text-btn3 text-white uppercase"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      cancel
                    </button>
                    <PrimaryButton
                      className="rounded-[10px] h-[48px]"
                      onClick={async () => {
                        await onConfirm();
                        setOpen(false);
                      }}
                    >
                      ok
                    </PrimaryButton>
                  </div>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
