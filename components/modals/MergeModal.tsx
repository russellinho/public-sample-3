/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ModalLoader from "../loadings/ModalLoader";
import TextInput from "../inputs/TextInput";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function MergeModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, session } = useAuth();

  useEffect(() => {
    if (router.asPath) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

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
                className="relative px-[24px] lg:px-[36px] py-[36px] min-w-[350px] lg:w-full max-w-[812px]
                bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all"
              >
                <Dialog.Title className="text-center">
                  <p className="text-body2 lg:text-body1 text-gray-500">
                    A profile linked to your discord ID already exists in the
                    Altverse Discord channel.
                  </p>
                  <h1 className="mt-4 font-bold text-h3-poppins lg:text-h2-poppins text-white">
                    YOU CAN ONLY USE ONE OF THE TWO
                  </h1>
                </Dialog.Title>

                <section className="mt-[24px] lg:mt-[32px] flex flex-col lg:flex-row gap-3 lg:gap-5">
                  <Link href={"/profiles/edit/" + address} passHref>
                    <a
                      className="w-full h-[198px] lg:h-[220px] relative flex flex-col justify-center items-center rounded-[24px] bg-gray-900
                      gap-3
                      ring ring-transparent hover:ring-primary-400 transition-all"
                    >
                      <p className="font-bold text-white text-h3-poppins">
                        DISCORD
                      </p>
                      <div>
                        <div className="relative w-[64px] h-[64px]">
                          <Image
                            src="/logo_discord.svg"
                            layout="fill"
                            alt="img"
                          />
                        </div>
                      </div>
                      <p className="text-body3 text-gray-600 text-center">
                        CREATED AT
                        <br className="hidden lg:block" />{" "}
                        <span className="text-white lg:leading-[22px]">00</span>
                      </p>
                    </a>
                  </Link>
                  <Link href={"/profiles/edit/" + address} passHref>
                    <a
                      className="w-full h-[198px] lg:h-[220px] relative flex flex-col justify-center items-center rounded-[24px] bg-gray-900
                      gap-3
                      ring ring-transparent hover:ring-primary-400 transition-all"
                    >
                      <p className="font-bold text-white text-h3-poppins">
                        ALTVERSE SITE
                      </p>
                      <div>
                        <div className="relative w-[64px] h-[64px]">
                          <Image src="/EmptyDAO.svg" layout="fill" alt="img" />
                        </div>
                      </div>
                      <p className="text-body3 text-gray-600 text-center">
                        CREATED AT
                        <br className="hidden lg:block" />{" "}
                        <span className="text-white lg:leading-[22px]">00</span>
                      </p>
                    </a>
                  </Link>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
