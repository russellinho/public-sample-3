import { ReactElement, useState } from "react";
import DefaultHeader from "../components/headers/DefaultHeader";
import { motion } from "framer-motion";
import PageHeader from "../components/headers/PageHeader";

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

export default function PageLayout({ scrolling, children }: { scrolling: boolean, children: ReactElement }) {
  // const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  return (
    <main
      className={`relative min-h-screen flex xl:text-white flex-col overflow-x-hidden ${scrolling ? '' : 'overflow-y-hidden'}
      bg-gray-900 text-white`}
    >
      <DefaultLayoutDecorator />
      <PageHeader />
      {/* <DefaultHeader setIsDrawerOpened={setIsDrawerOpened} /> */}
      {/* <NavigationDrawer open={isDrawerOpened} setOpen={setIsDrawerOpened} /> */}
      <div className="mx-auto md:px-4 flex flex-col md:flex-row md:justify-center flex-1 w-full max-w-7xl">
        {children}
      </div>
    </main>
  );
}
