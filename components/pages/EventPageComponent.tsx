/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import PageLayout from "../../layouts/PageLayout";
import Link from "next/link";
import EventMenuFooter from "../../components/footers/EventMenuFooter";
import CheckboxItem from "../../components/inputs/CheckboxItem";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import MessageModal from "../../components/modals/MessageModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import SearchField from "../../components/inputs/SearchField";
import axios from "axios";
import EnableAndDepositButton from "../../components/web3/EnableAndDepositButton";
import { useAuth } from "../../hooks/useAuth";
import {
  useApproval,
  useCandidates,
  useContractDetail,
  useReadCandidates,
  useRegisterCandidate,
} from "../../hooks/useContract";
import RewardInputModal from "../../components/modals/RewardInputModal";
import {
  useActivate,
  useEscrowState,
  useGrantPayeeRole,
  usePayees,
  useSettle,
} from "../../hooks/useEscrow";
import { toast } from "react-hot-toast";
import ModalLoader from "../../components/loadings/ModalLoader";
import { useNetwork } from "wagmi";
import { BUSD } from "../../utils/constants/tokens";
import { SupportedChainId } from "../../utils/constants/chains";
import { ethers } from "ethers";

const EventPageComponent = () => {
  const numberDataMapping: any = {
    "0": {
      val: "0",
      path: "/images/numbers/img_0.png",
      h: "101px",
      w: "125px",
    },
    "1": { val: "1", path: "/images/numbers/img_1.png", h: "90px", w: "113px" },
    "2": {
      val: "2",
      path: "/images/numbers/img_2.png",
      h: "103px",
      w: "128px",
    },
    "3": {
      val: "3",
      path: "/images/numbers/img_3.png",
      h: "102px",
      w: "130px",
    },
    "4": {
      val: "4",
      path: "/images/numbers/img_4.png",
      h: "106px",
      w: "137px",
    },
    "5": { val: "5", path: "/images/numbers/img_5.png", h: "99px", w: "129px" },
    "6": {
      val: "6",
      path: "/images/numbers/img_6.png",
      h: "102px",
      w: "129px",
    },
    "7": {
      val: "7",
      path: "/images/numbers/img_7.png",
      h: "101px",
      w: "127px",
    },
    "8": {
      val: "8",
      path: "/images/numbers/img_8.png",
      h: "102px",
      w: "129px",
    },
    "9": {
      val: "9",
      path: "/images/numbers/img_9.png",
      h: "103px",
      w: "130px",
    },
    ",": {
      val: ",",
      path: "/images/numbers/img_comma.png",
      h: "57px",
      w: "75px",
    },
    "?": {
      val: "?",
      path: "/images/numbers/img_0.png",
      h: "101px",
      w: "129px",
    },
  };

  const { address, session, isLoading: isAuthLoading } = useAuth();

  const router = useRouter();
  const { pid } = router.query;
  const [messageModalOpen, setMessageModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [selectedAll, setSelectedAll] = useState<boolean>(false);

  const [dao, setDao] = useState<string>("");
  const [daoName, setDaoName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<string[]>(
    []
  );
  const [reward, setReward] = useState<number>(9876543210);
  const [rewardFormatted, setRewardFormatted] = useState<any>([]);
  const [status, setStatus] = useState<string>("");
  const [eventLink, setEventLink] = useState<string>("");
  const [eventImage, setEventImage] = useState<string>("");
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [contractState, setContractState] = useState<string>("");

  const [rewardModalOpen, setRewardModalOpen] = useState<boolean>(false);
  const [rewardAmount, setRewardAmount] = useState<string>("0");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActivating, setIsActivating] = useState<boolean>(false);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const { isLoading: isLoadingActivate, write: activate } = useActivate(
    pid as string,
    () => {
      axios
        .patch("/api/events/" + pid, {
          status: "ACTIVATED",
        })
        .then((res) => {
          // toast.success("The event has been ended");
          setStatus("ACTIVATED");
          setIsActivating(false);
        })
        .catch((e) => {
          setIsActivating(false);
          console.log(e);
        });
    },
    () => {
      setIsActivating(false);
      console.error("Error closing event");
    }
  );

  const [participantsLoaded, setParticipantsLoaded] = useState<boolean>(false);

  const getMatchedList = (searchText: string) => {
    if (!searchText) return participants;
    return participants.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const onSearchChange = (value: string) => {
    setFilteredParticipants(getMatchedList(value));
  };

  const clearSearch = () => {
    onSearchChange("");
  };

  // const onSelectAll = () => {
  //   for (let i = 0; i < selectedParticipants.length; i++) {
  //     selectedParticipants[i] = !selectedAll;
  //   }
  // };

  // registerAsPayee
  const {
    data: registerData,
    isLoading: isRegisterLoading,
    write: participate,
  } = useRegisterCandidate(
    pid as string,
    "",
    () => {},
    () => {
      setIsLoading(false);
    },
    () => {
      setIsLoading(false);
      toast.success("You have joined the event");
    }
  );

  const { data: candidatesData } = useCandidates(pid as string);

  console.log({ candidatesData });

  const {
    data: grantPayeeData,
    isLoading: isGrantPayeeRoleLoading,
    write: grantPayees,
  } = useGrantPayeeRole(
    pid as string,
    selectedParticipants,
    () => {
      toast.success("You have picked the winners");
      setIsLoading(false);
      // router.reload();
    },
    () => {
      setIsLoading(false);
    }
  );

  useEffect(() => {
    if (!isAuthLoading && (!address || !session)) {
      router.push("/");
    }
  }, [isAuthLoading]);

  useEffect(() => {
    if (pid) {
      axios
        .get("/api/events/" + pid)
        .then(({ data }) => {
          if (data) {
            setOwnerAddress(data.ownerAddress || "");
            setContractState(data.state || "");
            setDaoName(data.organizer?.name || "");
            setAvatarUrl(
              data.organizer?.image
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${data.organizer.image.url}`
                : ""
            );
            setEventImage(
              data.image
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${data.image.url}`
                : ""
            );
            setTitle(data.name || "");
            setDescription(data.description || "");
            setReward(data.reward || 0);
            setEventLink(data.link || "");
            const rewardString = (data.reward || 0).toLocaleString();
            let formattedRewardTemp = [] as any;
            for (let i = 0; i < rewardString.length; i++) {
              formattedRewardTemp.push(
                numberDataMapping[rewardString.charAt(i)]
              );
            }
            setRewardFormatted(formattedRewardTemp);
            setStatus(data.status || "");
            setIsClosed(data.isClosed ?? false);
            console.log({ data });
          } else {
            // console.log(1);
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
    if (candidatesData && candidatesData.length) {
      setParticipants(candidatesData as string[]);
      setFilteredParticipants(candidatesData as string[]);
      // setParticipantsLoaded(true); // call only once
    }
  }, [candidatesData]);

  const { data: escrowState } = useEscrowState(pid as string);

  const { data: contractDetail } = useContractDetail(
    // ownerAddress,
    "0x0000000000000000000000000000000000000000",
    pid as string
  );

  const {
    data: payeesAddresses,
    isSuccess: isPayeesAddressesSuccess,
    isLoading: isPayeesLoading,
  } = usePayees(pid as string);

  const { chain } = useNetwork();
  const chainId = chain?.id ?? "56";
  const tokenAddress = BUSD[chainId as SupportedChainId].address;

  const { write: settle } = useSettle(
    pid as string,
    true,
    () => {
      setIsLoading(false);
    },
    () => {
      setIsLoading(false);
    }
  );

  // const clickRanking = () => {
  //   alert("test");
  // };
  console.log({ escrowState });

  const confirmReward = () => {
    if ((!payeesAddresses || payeesAddresses.length === 0) && grantPayees) {
      setIsLoading(true);
      grantPayees();
    }

    // if (payeesAddresses && payeesAddresses?.length > 0 && activate) {
    //   activate();
    // }

    if (payeesAddresses && payeesAddresses?.length > 0 && settle) {
      settle();
    }
  };

  const confirmEndEvent = async () => {
    const { data } = await axios.patch(("/api/events/" + pid) as string, {
      isClosed: true,
    });

    setIsClosed(data.isClosed);
  };

  const rewardValue = contractDetail
    ? isNaN(+contractDetail?.[0])
      ? 0
      : +contractDetail[0] / 10 ** 18
    : 0;

  useEffect(() => {
    if (payeesAddresses && payeesAddresses.length >= 0) {
      setSelectedParticipants(payeesAddresses as string[]);
    }
  }, [payeesAddresses]);

  return (
    <>
      {isLoading && <ModalLoader />}
      {selectedTab === 0 && (
        <>
          {/* Sphere */}
          <section
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] h-[280px] md:w-[640px] md:h-[440px]"
            // style={{
            //   background:
            //     "radial-gradient(50% 50% at 50% 50%, rgba(255, 204, 35, 1) 0%, rgba(255, 204, 35, 0.5) 100%)",
            //   opacity: 0.5,
            // }}
          >
            <div className="absolute top-[-48px] md:top-[-347px] left-1/2 -translate-x-1/2 w-[482px] h-[482px] md:w-[1080px] md:h-[1080px] bg-glow-gradient rounded-full"></div>
            <div className="absolute flex flex-row justify-center items-end gap-1 top-[65px] md:top-[140px] left-0 right-0 ml-[auto] mr-[auto] text-center z-10">
              <div
              // className={`relative`}
              // style={{
              //   width: "80px",
              //   height: "120px",
              // }}
              >
                <Image
                  src={"/images/numbers/img_dollar.png"}
                  alt={"dollar"}
                  width={80}
                  height={120}
                  // layout="fill"
                  // objectFit="contain"
                  // objectPosition="bottom"
                />
              </div>
              {Array.from(rewardValue.toLocaleString()).map(
                (item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      // className={`relative`}
                      // style={{
                      //   width: "80px",
                      //   height: "120px",
                      // }}
                    >
                      <Image
                        src={numberDataMapping[item].path}
                        alt={"number"}
                        // layout="fill"
                        width={80}
                        height={120}
                        // objectFit="contain"
                        // objectPosition="bottom"
                      />
                    </div>
                  );
                }
              )}
            </div>
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
          <div className="relative flex-1 flex flex-col gap-[40px] max-w-7xl w-full mx-auto md:px-[16px] text-center items-center justify-center mb-[200px] mt-[240px] md:mt-[267px]">
            {/* Title section */}
            <section className="flex flex-col gap-2">
              {address &&
                address === ownerAddress &&
                payeesAddresses?.length === 0 && (
                  <EnableAndDepositButton
                    address={address}
                    contractAddress={pid}
                    editable={address === ownerAddress}
                    contractDetail={contractDetail}
                    onClick={() => setRewardModalOpen(true)}
                  />
                )}
              <div className="flex flex-row ml-auto mr-auto items-center gap-4">
                <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden">
                  <Image
                    src={avatarUrl || "/EmptyDao.svg"}
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <p className="font-bold">{daoName}</p>
              </div>
              <p className="text-h1-poppins">{title}</p>
            </section>
            <section className="max-w-[347px] min-h-[120px] md:min-h-[240px] md:max-w-[800px] w-full h-full rounded-lg overflow-hidden">
              <div className="relative max-w-[347px] min-h-[120px] md:min-h-[240px] md:max-w-[800px] w-[100%] h-[100%]">
                <Image
                  src={eventImage || "/images/sample_img.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </section>
            {/* Description section */}
            <section className="w-full mx-[15px] md:mx-0 relative max-w-[800px] border border-gray-700 rounded-[16px] p-[24px] ">
              <p className="whitespace-pre-line text-left">{description}</p>
            </section>
            {eventLink ? (
              <section>
                <Link href={eventLink} passHref target="_blank">
                  <a target="_blank">
                    <p className="relative uppercase underline font-medium">
                      link to event details
                    </p>
                  </a>
                </Link>
              </section>
            ) : null}

            {!isClosed && address && address !== ownerAddress && (
              <div className="fixed md:static md:mt-[49px] bottom-0 w-full">
                <PrimaryButton
                  className="rounded-none md:rounded-[100px] w-full max-w-[480px]"
                  disabled={candidatesData?.includes(address)}
                  onClick={() => {
                    if (participate) {
                      participate();
                      setIsLoading(true);
                    }
                  }}
                >
                  {candidatesData?.includes(address)
                    ? "You have joined the event"
                    : "Join the event"}
                </PrimaryButton>
              </div>
            )}
          </div>

          <RewardInputModal
            open={rewardModalOpen}
            setOpen={setRewardModalOpen}
            rewardAmount={rewardAmount}
            setRewardAmount={setRewardAmount}
          />
        </>
      )}
      {selectedTab === 1 && (
        <div className="relative flex-1 flex flex-col max-w-7xl w-full mx-auto px-[16px] gap-[32px]">
          <p className="font-syncopate text-h4-syncopate text-[20px] uppercase text-center">
            select winners
          </p>
          <motion.div
            className="pt-[20px] md:pt-[80px] pb-[106px] px-[16px] md:px-[80px] md:mx-auto mb-[50px] max-w-[800px] w-full flex-1 border rounded-[16px] md:rounded-[32px] bg-gray-900
                    overflow-visible"
            animate={{
              borderColor: ["#1C1C1C", "#00D7F4"],
            }}
            transition={{ ease: "easeIn" }}
          >
            <div className="hidden md:flex flex-row items-center justify-between">
              {/* <CheckboxItem
                checked={selectedAll}
                setChecked={setSelectedAll}
                text={"Select All"}
                name={`selectAll`}
                otherAction={onSelectAll}
              /> */}
              <SearchField
                placeholder="Search wallet address"
                onChange={onSearchChange}
                onClear={clearSearch}
              />
            </div>
            <div className="flex flex-col items-start gap-[24px] md:hidden">
              <SearchField
                placeholder="Search wallet address"
                onChange={onSearchChange}
                onClear={clearSearch}
              />
              {/* <CheckboxItem
                checked={selectedAll}
                selectedParticipants={selectedParticipants}
                setSelectedParticipants={setSelectedParticipants}
                text={"Select All"}
                name={`selectAll`}
                otherAction={onSelectAll}
              /> */}
            </div>
            <hr className="my-[40px] border-gray-600" />
            {filteredParticipants.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between my-[30px]"
                >
                  <CheckboxItem
                    checked={selectedParticipants.includes(item)}
                    selectedParticipants={selectedParticipants}
                    setSelectedParticipants={setSelectedParticipants}
                    text={item}
                    name={`participant-${index}`}
                    className="lowercase break-words"
                    disabled={
                      payeesAddresses && payeesAddresses?.length > 0
                        ? true
                        : false
                    }
                  />
                  {/* <PrimaryButtonAlt
                    onClick={clickRanking}
                    className="w-[120px] h-[36px] font-poppins text-[13px] font-normal"
                  >
                    ranking
                  </PrimaryButtonAlt> */}
                </div>
              );
            })}
          </motion.div>
          {Number(escrowState) !== 2 && (
            <PrimaryButton
              onClick={confirmReward}
              className="mb-[200px] md:max-w-[500px] text-gray-900 ml-auto mr-auto"
            >
              {!payeesAddresses || payeesAddresses?.length === 0
                ? `Pick ${selectedParticipants.length} selected wallets to be winners.`
                : settle
                ? `Send ${
                    Number(rewardValue) / (payeesAddresses.length || 1)
                  } BUSD to each winner`
                : `Activate the contract`}
            </PrimaryButton>
          )}
        </div>
      )}
      {selectedTab === 2 && (
        <div className="mt-4 px-[16px] md:px-0">
          <div className="flex justify-center items-center md:gap-[75px]">
            <div className="relative w-[36px] md:w-[72px] h-[70px] md:h-[140px]">
              <Image
                src={"/images/img_golden01.png"}
                alt="left-wing"
                layout="fill"
              />
            </div>
            <p className="font-syncopate text-h6-syncopate md:text-h4-syncopate uppercase text-center">
              winners of the event
            </p>
            <div className="relative w-[36px] md:w-[72px] h-[70px] md:h-[140px]">
              <Image
                src={"/images/img_golden02.png"}
                alt="right-wing"
                layout="fill"
              />
            </div>
          </div>
          <br />
          <motion.div
            className="relative flex-1 flex flex-col max-w-7xl w-full mx-auto md:px-[16px] gap-[20px] break-words"
            animate={{
              borderColor: ["#1C1C1C", "#00D7F4"],
            }}
            transition={{ ease: "easeIn" }}
          >
            {selectedParticipants?.map((p, index) => {
              if (p) {
                return (
                  <div
                    key={index}
                    className="w-full flex flex-col gap-2 md:gap-0 md:flex-row md:items-center justify-between border border-gray-700 rounded-[28px] px-[32px] py-[16px] truncate"
                  >
                    <p className="text-xs md:text-base">{p}</p>
                    <p className="font-bold">
                      BUSD $
                      {Number(rewardValue) / (selectedParticipants.length || 1)}
                    </p>
                  </div>
                );
              }
            })}
          </motion.div>
        </div>
      )}
      {(address || Number(escrowState) === 2) ? (
        <EventMenuFooter
          isOwner={!!address && address === ownerAddress}
          escrowState={Number(escrowState)}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          ended={isClosed}
          endEvent={() => {
            setConfirmModalOpen(true);
          }}
          participants={participants.length}
          dao={dao}
          activating={isActivating}
        />
      ) : null}
      <MessageModal
        message={`you've joined the event!`}
        image={"/images/img_coin.svg"}
        open={messageModalOpen}
        setOpen={setMessageModalOpen}
      />
      <ConfirmModal
        message={`do you want to close the event?`}
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        onConfirm={confirmEndEvent}
      />
    </>
  );
};

EventPageComponent.getLayout = (page: ReactElement) => (
  <PageLayout scrolling={false}>{page}</PageLayout>
);

// export async function getServerSideProps(context: any) {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     };
//   }

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export default EventPageComponent;
