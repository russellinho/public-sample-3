import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import CustomConnectButton from "../authentication/CustomConnectButton";

export default function PageHeader() {
  const { status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  return (
    <header
      className="relative flex items-center
        md:mb-[24px] justify-between h-[64px] md:px-[24px] xl:px-[80px]
        xl:mb-[64px] xl:justify-between md:h-[120px]
      "
    >
      <div className="flex items-center gap-[12px] z-[50]">
        <button
          className="xl:hidden w-[32px] h-[32px]"
          onClick={() => router.push("/")}
        >
          <Image
            width={32}
            height={32}
            src="/icons/ic_back_white.svg"
            alt="icon"
          />
        </button>
        <Link href="/" passHref>
          <a className="hidden xl:block">
          <div className="relative w-[232px] h-[32px]">
              <Image
                src="/altverse_logo_white.svg"
                alt="altverse"
                layout="fill"
              />
            </div>
          </a>
        </Link>
      </div>
      {!loading && (
        <>
          <div className="hidden xl:flex gap-4">
            <CustomConnectButton />
          </div>
        </>
      )}
    </header>
  );
}
