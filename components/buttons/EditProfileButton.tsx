import Image from "next/image";
import { useRouter } from "next/router";

export default function EditProfileButton() {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <button
      className="absolute top-[20px] right-[20px] md:top-[40px] md:right-[40px] px-[14px] md:px-[20px] py-[13px] w-[48px] md:w-[168px] h-[48px] flex justify-between items-center border border-primary-400 rounded-[24px]"
      onClick={() => router.push("/profiles/edit/" + pid)}
    >
      <div className="relative w-[20px] h-[20px]">
        <Image src="/icons/ic_edit.svg" alt="icon" layout="fill" />
      </div>
      <div className="hidden md:block font-medium text-primary-500 text-[16px] leading-[22px] tracking-[-0.0125em] uppercase">
        EDIT PROFILE
      </div>
    </button>
  );
}
