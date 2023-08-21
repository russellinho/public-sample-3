import { ReactElement, useState, memo } from "react";
import DefaultHeader from "../components/headers/DefaultHeader";
import { motion } from "framer-motion";
import EventList from "../components/events/EventList";
import WalletBlock from "../components/events/WalletBlock";
import Image from "next/image";

const DefaultLayoutDecorator = () => {
  return (
    <motion.div
      className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[1884px] h-[1944px]"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #00D7F4 0%, #1C1C1C 100%)",
        // opacity: 0.15,
        // aspectRatio: 1,
      }}
      animate={{ opacity: [0.05, 0.15] }}
      // transition={{
      //   duration: 3,
      //   repeat: Infinity,
      //   repeatDelay: 3,
      //   repeatType: "reverse",
      // }}
    ></motion.div>
  );
};

const TwinkleDecorator = () => {
  return (
    <motion.div
      animate={{ opacity: [0.66, 0.33] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut",
        repeatType: "reverse",
      }}
      className="absolute top-[-224px] md:top-0 left-0 w-full h-[400px] pointer-events-none"
    >
      <motion.div
        animate={{ backgroundPositionY: ["0px", "10000px"] }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-full h-full bg-[url('/images/img_twinkle.png')] bg-repeat pointer-events-none"
      ></motion.div>
    </motion.div>
  );
};

export default function DefaultLayout({
  children,
}: {
  children: ReactElement;
}) {
  // const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  return (
    <main
      className="relative min-h-screen flex xl:text-white flex-col overflow-hidden
      bg-gray-900 text-white"
    >
      <DefaultLayoutDecorator />
      <TwinkleDecorator />
      <DefaultHeader />
      {/* Wallet State and Created Escrow List (Sidebar) */}
      {/* <Sidebar /> */}
      <div className="mx-auto md:px-4 flex flex-col xl:flex-row xl:justify-between flex-1 w-full max-w-7xl">
        <div className="flex flex-col items-center flex-1">{children}</div>
      </div>
    </main>
  );
}

// function Sidebar() {
//   // const { data: session } = useSession();

//   // const hasMounted = useHasMounted();
//   // if (!hasMounted) return <></>;
//   // if (!session) return <></>;
//   return (
//     <>
//       <MemoizedWalletBlock />
//       <MemoizedEventList />
//     </>
//   );
// }

// const MemoizedEventList = memo(function MemoizedEventList() {
//   return <EventList />;
// });

// const MemoizedWalletBlock = memo(function MemoizedWalletBlock() {
//   return <WalletBlock />;
// });
