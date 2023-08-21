import Image from "next/image";

export default function ModalLoader() {
  return (
    <div
      className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-50 z-10
        flex justify-center items-center"
    >
      <div className="relative w-[48px] h-[48px]">
        <Image
          className="animate-spin"
          src="/images/loading.png"
          alt="loading"
          layout="fill"
        />
      </div>
    </div>
  );
}
