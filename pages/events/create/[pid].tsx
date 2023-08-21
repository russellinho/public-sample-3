/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import Image from "next/image";
import TextInput from "../../../components/inputs/TextInput";
import { useState, useEffect, ReactElement } from "react";
import TextArea from "../../../components/inputs/TextArea";
import axios from "axios";
import { useAccount } from "wagmi";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/router";
import PageLayout from "../../../layouts/PageLayout";
import RewardInputModal from "../../../components/modals/RewardInputModal";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";

const DynamicEnableAndDepositButton = dynamic(
  () => import("../../../components/web3/EnableAndDepositButton"),
  {
    ssr: false,
  }
);

const UpdateEventForm = ({
  avatarUrl,
  setRewardInputModalOpen,
  dao,
  setDao,
  title,
  description,
  reward,
  setReward,
  eventImage,
  eventLink,
}: {
  avatarUrl: string;
  setRewardInputModalOpen: any;
  dao: string;
  setDao: any;
  title: string;
  description: string;
  reward: number;
  setReward: any;
  eventImage?: string;
  eventLink?: string;
}) => {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };

  const { address } = useAccount({ onDisconnect: goHome });
  const { pid } = router.query;

  return (
    <>
      <section className="pb-[60px]">
        <div className="flex flex-col space-y-[20px]">
          <div className="md:hidden">
            <TextInput
              value={dao}
              setValue={setDao}
              name="dao"
              placeholder="Your dao name"
              label="DAO Name"
              disabled
              required
            />
          </div>
          <TextInput
            value={title}
            name="headline"
            placeholder="Headline (Please enter your one-line introduction)"
            label="Headline"
            disabled
            required
          />
          <TextArea
            value={description}
            name="description"
            placeholder="You can write about your years of experience, industry, or skills. People also talk about their achievements or previous timezone experiences."
            label="Description"
            disabled
            required
          />
          <TextInput
            value={eventLink || ""}
            name="eventLink"
            placeholder="Add any external link about your event or DAO"
            label="Event Link"
            disabled
          />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
            <p className="text-[16px] font-bold md:text-h4-poppins">
              Event Image
            </p>
            {eventImage && (
              <div className="max-w-[300px] min-h-[120px] w-full h-full">
                <div className="relative max-w-[300px] min-h-[120px] w-[100%] h-[100%]">
                  <Image
                    src={eventImage}
                    alt="banner"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="mt-[24px] flex justify-center">
        {address && (
          <DynamicEnableAndDepositButton
            address={address}
            contractAddress={pid}
            contractDetail={null}
            editable={true}
            onClick={null}
          />
        )}
      </div>
    </>
  );
};

const CreateEventPage = () => {
  const { address, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { pid } = router.query;

  const [dao, setDao] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("/images/img_profile.svg");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventImage, setEventImage] = useState<string>("");
  const [eventLink, setEventLink] = useState<string>("");
  const [reward, setReward] = useState<number>(0);

  const [rewardInputModalOpen, setRewardInputModalOpen] =
    useState<boolean>(false);
  const [rewardAmount, setRewardAmount] = useState<string>("");

  useEffect(() => {
    if (pid) {
      axios
        .get("/api/events/" + pid)
        .then(({ data }) => {
          if (data) {
            setDao(data.organizer?.name || "");
            setAvatarUrl(
              data.organizer?.image
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${data.organizer.image.url}`
                : ""
            );
            setTitle(data.name || "");
            setDescription(data.description || "");
            setReward(data.reward || 0);
            setEventImage(
              data.image
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${data.image.url}`
                : ""
            );
            setEventLink(data.link || "");
          } else {
            router.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
          router.push("/");
        });
    }
  }, [pid]);

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="relative flex-1 flex flex-col max-w-7xl w-full mx-auto md:px-[16px]">
        <motion.div
          className="pt-[20px] md:pt-[80px] pb-[56px] px-[16px] md:px-[80px] mx-auto md:mb-[100px] max-w-[800px] w-full flex-1 md:border md:rounded-[32px] bg-gray-900
              md:overflow-hidden"
          animate={{
            borderColor: ["#1C1C1C", "#00D7F4"],
          }}
          transition={{ ease: "easeIn" }}
        >
          {/* Profile Image Section */}
          <section className="flex flex-col md:flex-row items-center justify-between md:border md:border-gray-700 md:rounded-[16px] p-[32px]">
            <div className="rounded-full">
              <div className="relative w-[120px] h-[120px]">
                <label
                  htmlFor="input-file"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={avatarUrl || "/images/img_profile.svg"}
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </label>
              </div>
            </div>
            <div className="hidden md:flex flex-col space-y-[8px] w-[70%]">
              <TextInput
                value={dao}
                setValue={setDao}
                name="dao"
                placeholder="Your dao name"
                label="DAO Name"
                required
                disabled
              />
            </div>
          </section>
          <section className="mt-[16px] md:mt-[32px] flex flex-col">
            <UpdateEventForm
              avatarUrl={avatarUrl}
              setRewardInputModalOpen={setRewardInputModalOpen}
              dao={dao}
              setDao={setDao}
              title={title}
              description={description}
              reward={reward}
              setReward={setReward}
              eventImage={eventImage}
              eventLink={eventLink}
            />
          </section>
        </motion.div>
      </div>
      <RewardInputModal
        open={rewardInputModalOpen}
        setOpen={setRewardInputModalOpen}
        rewardAmount={rewardAmount}
        setRewardAmount={setRewardAmount}
      />
    </>
  );
};

CreateEventPage.getLayout = (page: ReactElement) => (
  <PageLayout scrolling={false}>{page}</PageLayout>
);

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default CreateEventPage;
