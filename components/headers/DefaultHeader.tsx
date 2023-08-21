import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CustomConnectButton from "../authentication/CustomConnectButton";
import PostJobButton from "../buttons/PostJobButton";

export default function DefaultHeader() {
  const { status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <header
        className="relative md:flex xl:flex items-center justify-between h-[64px] md:h-[120px] z-10
          md:px-[24px] 
          xl:px-[80px]
        "
      >
        {/* mobile */}
        <Link href="/" passHref>
          <a className="md:hidden">
            <div
              className="absolute 
              w-[145px] h-[20px] 
              top-[28px] right-0 left-0 ml-[auto] mr-[auto]"
            >
              <div className=" w-[145px] h-[20px] ">
                <Image
                  src="/altverse_logo_white.svg"
                  alt="altverse"
                  layout="fill"
                />
              </div>
            </div>
          </a>
        </Link>
        <div className="md:hidden absolute top-[20px] right-[24px]">
          <CustomConnectButton responsive={true} />
        </div>
        {/* desktop */}
        <Link href="/" passHref>
          <a className="hidden md:block">
            <div className="relative w-[232px] h-[32px]">
              <Image
                src="/altverse_logo_white.svg"
                alt="altverse"
                layout="fill"
              />
            </div>
          </a>
        </Link>
        <div className="hidden md:flex space-x-2">
          <CustomConnectButton />
        </div>
      </header>
    </>
  );
}
