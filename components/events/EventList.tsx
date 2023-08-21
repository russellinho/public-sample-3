import React, { memo, useState } from "react";
import { BigNumber } from "ethers";
import { useFindEvents } from "../../hooks/useFindEvents";
import StateIndicator, { EventState } from "./StateIndicator";
import { classNames } from "../../utils/helpers";
import { useRouter } from "next/router";
import PrimaryButtonAlt from "../buttons/PrimaryButtonAlt";
import Link from "next/link";
import { useEscrow } from "../../hooks/useEscrow";
import useSWR from "swr";
import axios from "axios";
import { useAccount } from "wagmi";
import moment from "moment";

const style = {
  card: {
    container:
      "flex flex-col mt-[64px] md:h-fit md:absolute md:right-0 md:top-[0px] md:mr-[20px] xl:mr-[80px] md:mt-[120px] rounded-[32px] w-[320px] min-h-[120px] bg-[#252525] shadow-lg z-[19]",
  },

  container:
    "flex flex-col space-y-[8px] first:pt-[0px] py-[24px] last:pb-[0px]",
  divider: "divide-y divide-[#3F3F3F]",
  title: "text-body2 truncate",
  spaceBetween: "flex justify-between",
  contentText: "text-body3",
  contentTitle: "text-[#757575]",
  emptyMessage: "text-body2 text-[#757575]",

  skeleton: {
    appearance: "h-[16px] bg-[#3F3F3F] rounded",
  },

  contractList: {
    margin: "mx-[24px] my-[32px]",
    newContractButton: {
      size: "w-full h-[40px]",
    },
  },
};

export interface IEventContract {
  isClosed: any;
  _id: string;
  contractAddress: string;
  ownerAddress: string;
  name: string;
  createdAt: string;
  state?: string;
}

export default function EventList({ address }: { address: string }) {
  const router = useRouter();
  // const { escrows } = useEscrow();

  // console.log({ escrows });

  return (
    <div className={style.card.container}>
      <div className={classNames(style.contractList.margin, "space-y-[28px]")}>
        {/* Title */}
        <p className="text-h4-poppins">Event List</p>
        <hr className="my-[40px] border-[#3F3F3F]" />
        {/* Contract Lists */}
        <MemoizedContractLists />

        {/* New Contract Button */}
        <PrimaryButtonAlt
          onClick={() => router.push(`/events/create`)}
          className="w-[100%] h-[40px] font-poppins text-[14px] font-normal"
        >
          <span>+ CREATE A BOUNTY EVENT</span>
        </PrimaryButtonAlt>
      </div>
    </div>
  );
}

const MemoizedContractLists = memo(function MemoizedContractLists() {
  const { address } = useAccount();

  return (
    <>
      <EventListInternalFunder address={address!} />
    </>
  );
});

const EventListInternalFunder = ({ address }: { address: string }) => {
  const { data, error } = useSWR(
    `/api/events?ownerAddress=${address}`,
    async (...args) => (await axios.get(...args)).data
  );
  if (!data || !data?.docs) return <LoadingList />;
  if (data?.docs?.length === 0) return <EmptyList />;

  return <MemoizedFetchedEventList list={data.docs} />;
};

const LoadingSkeleton = () => {
  return (
    <div className={style.container}>
      <div className={style.skeleton.appearance}></div>
      <div className="grid grid-cols-3 gap-4">
        <div
          className={classNames(style.skeleton.appearance, "col-span-2")}
        ></div>
        <div
          className={classNames(style.skeleton.appearance, "col-span-1")}
        ></div>
      </div>
    </div>
  );
};

const LoadingList = () => {
  return (
    <div className={classNames("animate-pulse", style.divider)}>
      {Array.from(Array(3)).map((_, index) => {
        return <LoadingSkeleton key={index} />;
      })}
    </div>
  );
};

const MemoizedFetchedEventList = memo(function MemoizedFetchedEventList({
  list,
}: {
  list: IEventContract[];
}) {
  return (
    <div className={style.divider}>
      {list.map((event) => {
        return <MemoizedFetchedEvent key={event._id} event={event} />;
      })}
    </div>
  );
});

const MemoizedFetchedEvent = memo(function MemoizedFetchedEvent({
  event,
}: {
  event: IEventContract;
}) {
  const formatted = moment(new Date(event.createdAt)).format("YYYY-MM-DD");

  return (
    <div className={style.container}>
      <Link href={`/events/${event.contractAddress}`} passHref>
        <a className={style.title}>{event.name}</a>
      </Link>
      <div className={style.spaceBetween}>
        <div className={style.contentText}>
          <span className={style.contentTitle}>CREATED AT </span>
          <span>{formatted}</span>
        </div>
        <StateIndicator
          state={event.isClosed ? EventState.Closing : EventState.Ongoing}
        />
      </div>
    </div>
  );
});

const EmptyList = () => {
  return (
    <div className={style.emptyMessage}>
      There is no smart contract history yet.
    </div>
  );
};
