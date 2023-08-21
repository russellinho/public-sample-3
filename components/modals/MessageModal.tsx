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

export default function MessageModal({
  message,
  image,
  open,
  setOpen,
}: {
  message: string;
  image?: string;
  open: boolean;
  setOpen: any;
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
                className="relative px-[24px] py-[36px] w-[320px]
                bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all"
              >
                <button className="relative top-0 right-0 w-[20px] h-[20px]" onClick={() => setOpen(false)}>
                  <Image
                      src={"/icons/ic_close_gray.svg"}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                  />
                </button>
                <section className="flex flex-col justify-center items-center">
                    <p>
                        {message}
                    </p>
                    {image &&
                      <div>
                          <Image src={image} alt="img" width={144} height={104} />
                      </div>
                    }
                    <PrimaryButton
                        onClick={() => {setOpen(false)}}
                    >
                        ok
                    </PrimaryButton>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
