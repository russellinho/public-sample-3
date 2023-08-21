/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import Image from "next/image";
import TextInput from "../../../components/inputs/TextInput";
import { useState, ReactElement, useEffect } from "react";
import TextArea from "../../../components/inputs/TextArea";
import axios from "axios";
import { useAccount } from "wagmi";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/router";
import PageLayout from "../../../layouts/PageLayout";
import RewardInputModal from "../../../components/modals/RewardInputModal";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";

const DynamicContractCreationButton = dynamic(
  () => import("../../../components/web3/ContractCreationButton"),
  {
    ssr: false,
  }
);

const CreateEventForm = ({
  avatarId,
  setRewardInputModalOpen,
  dao,
  setDao,
}: {
  avatarId?: string;
  setRewardInputModalOpen?: any;
  dao: string;
  setDao: any;
}) => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  const { address } = useAccount({ onDisconnect: goHome });

  const [headline, setHeadline] = useState<string>("");
  const [eventLink, setEventLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventImage, setEventImage] = useState<string>("");
  const [eventImageId, setEventImageId] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const uploadFile = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const { data } = await axios.post("/api/media", formData);
    setEventImage(process.env.NEXT_PUBLIC_MEDIA_URL + data[0].url);
    setEventImageId(data[0]._id);
  };

  const clearBanner = async () => {
    // delete image
    const ret = await axios.delete(`/api/media/${eventImageId}`, {
      headers: {
        "x-api-key": process.env.SERVICE_API_KEY!,
      },
    });

    if (ret.status === 200) {
      setEventImage("");
      setEventImageId("");
    } else {
      console.error("Could not delete media: ", ret);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="pb-[60px]">
        <div className="flex flex-col space-y-[20px]">
          <div className="md:hidden">
            <TextInput
              value={dao}
              setValue={setDao}
              name="dao"
              placeholder="Your dao name"
              label="DAO Name"
              required
            />
          </div>
          <TextInput
            value={headline}
            setValue={setHeadline}
            name="headline"
            placeholder="Headline (Please enter your one-line introduction)"
            label="Headline"
            required
          />
          <TextArea
            value={description}
            setValue={setDescription}
            name="description"
            placeholder="You can write about your years of experience, industry, or skills. People also talk about their achievements or previous timezone experiences."
            label="Description"
            required
          />
          <TextInput
            value={eventLink}
            setValue={setEventLink}
            name="eventLink"
            placeholder="Add any external link about your event or DAO"
            label="Event Link"
          />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
            <p className="text-[16px] font-bold md:text-h4-poppins">
              Event Image
            </p>
            {eventImage === "" ? (
              <label
                htmlFor="b-input-file"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div
                  className="flex relative h-[56px] rounded-[100px] font-medium text-[18px]
                  leading-[26px] tracking-[0.0125em] uppercase text-center
                  hover:opacity-80 transition-opacity border w-[200px] items-center justify-center
                  "
                >
                  upload
                </div>
                <input
                  id="b-input-file"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={uploadFile}
                />
              </label>
            ) : (
              <div className="max-w-[300px] min-h-[120px] w-full h-full">
                <div className="relative max-w-[300px] min-h-[120px] w-[100%] h-[100%]">
                  <Image
                    src={eventImage}
                    alt="banner"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-0 right-0">
                    <div className="relative w-[32px] md:w-[32px] h-[32px] md:h-[32px]">
                      <button onClick={clearBanner} type="button">
                        <Image
                          src="/icons/Ic_navi.svg"
                          alt="icon"
                          layout="fill"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="mt-[24px] flex justify-center">
        {address && (
          <DynamicContractCreationButton
            address={address}
            formData={{
              dao,
              daoImage: avatarId,
              headline,
              description,
              eventLink,
              eventImage: eventImageId,
            }}
          />
        )}
      </div>
    </form>
  );
};

const CreateEventPage = () => {
  const { address, session, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [dao, setDao] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("/images/img_profile.svg");

  const [rewardInputModalOpen, setRewardInputModalOpen] =
    useState<boolean>(false);
  const [rewardAmount, setRewardAmount] = useState<string>("");

  const uploadFile = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const { data } = await axios.post("/api/media", formData);
    setAvatarUrl(process.env.NEXT_PUBLIC_MEDIA_URL + data[0].url);
    setAvatarId(data[0]._id);
  };

  useEffect(() => {
    if (!isAuthLoading && (!address || !session)) {
      router.push("/");
    }
  }, [isAuthLoading]);

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
                    className="rounded-full"
                  />
                  <div className="absolute bottom-0 right-0">
                    <div className="relative w-[32px] md:w-[32px] h-[32px] md:h-[32px]">
                      <Image
                        src="/icons/ic_camera.svg"
                        alt="icon"
                        layout="fill"
                      />
                    </div>
                  </div>
                  <input
                    id="input-file"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={uploadFile}
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
              />
            </div>
          </section>
          <section className="mt-[16px] md:mt-[32px] flex flex-col">
            <CreateEventForm
              avatarId={avatarId}
              setRewardInputModalOpen={setRewardInputModalOpen}
              dao={dao}
              setDao={setDao}
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
