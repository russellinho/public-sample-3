import type { NextPage } from "next";
import Image from "next/image";
import PrimaryButton from "../components/buttons/PrimaryButton";
import EventList from "../components/events/EventList";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
// import Script from "next/script";

const Home: NextPage = () => {
  const { address, session } = useAuth();
  const router = useRouter();

  return (
    <>
      <div className="relative md:static flex flex-col items-center pb-12">
        {/* Sphere */}
        <section
          className="absolute top-[64px] md:top-0 left-1/2 -translate-x-1/2 w-[280px] h-[280px] md:w-[640px] md:h-[440px]"
          // style={{
          //   background:
          //     "radial-gradient(50% 50% at 50% 50%, rgba(255, 204, 35, 1) 0%, rgba(255, 204, 35, 0.5) 100%)",
          //   opacity: 0.5,
          // }}
        >
          <div className="absolute top-[-48px] md:top-[-347px] left-1/2 -translate-x-1/2 w-[482px] h-[482px] md:w-[1080px] md:h-[1080px] bg-glow-gradient rounded-full"></div>

          <div className="relative w-[280px] h-[280px] md:hidden">
            <Image
              src={"/images/img_reward_full_mobile.png"}
              alt="jackpot"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative w-[640px] h-[440px] hidden md:block">
            <Image
              src={"/images/img_reward_full.png"}
              alt="jackpot"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>
        {/* Create Event */}
        <section className="flex flex-col gap-10 mt-[384px] md:mt-[400px] text-center uppercase">
          <h1 className="px-[32px] font-syncopate text-h5-syncopate md:text-h3-syncopate uppercase primary-stroke max-w-[1136px]">
            create
            <br className="lg:hidden" /> your customized
            <br className="lg:hidden" /> giveaway or bounty
            <br className="lg:hidden" /> for your dao!
          </h1>
          <div>
            {/* <Link href={"/events/create"} passHref>
              <a> */}
            <PrimaryButton
              className="max-w-[280px] text-gray-900"
              onClick={() => {
                if (address && session) return router.push("/events/create");
                return toast.error("You must connect wallet first!");
              }}
            >
              create your event
            </PrimaryButton>
            {/* </a>
            </Link> */}
          </div>
        </section>
        {address && session && <EventList address={address} />}
      </div>
    </>
  );
};

export default Home;
