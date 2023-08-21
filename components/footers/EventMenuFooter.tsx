import Link from "next/link";
import PrimaryButton from "../buttons/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export default function EventMenuFooter({
  isOwner,
  escrowState,
  selectedTab,
  setSelectedTab,
  ended,
  endEvent,
  participants,
  dao,
  activating,
}: {
  isOwner: boolean;
  escrowState?: number;
  selectedTab: number;
  setSelectedTab: any;
  ended: boolean;
  endEvent: any;
  participants: number;
  dao: string;
  activating: boolean;
}) {
  const { address } = useAuth();

  if (ended) {
    return (
      <footer
        className="text-h4-poppins fixed text-center py-[24px] text-[#1C1C1C] uppercase"
        style={{
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#757575",
        }}
      >
        <p>- this event is closed -</p>
      </footer>
    );
  }

  if (isOwner) {
    return (
      <footer
        className="text-h4-poppins fixed text-center uppercase"
        style={{
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#0E0E0E",
        }}
      >
        {ended ? (
          <div>
            <button
              className="relative text-[14px] md:text-[18px] px-[15px] md:px-[30px] py-[24px]"
              onClick={() => {
                setSelectedTab(0);
              }}
            >
              <p
                className={`${
                  selectedTab !== 0 && "text-gray-500 font-normal"
                }`}
              >
                Event Details
              </p>
              {selectedTab === 0 && (
                <div className="absolute h-[4px] w-[100%] left-0 bottom-0 bg-[#D9D9D9]"></div>
              )}
            </button>
            {isOwner && (
              <button
                className="relative text-[14px] md:text-[18px] px-[15px] md:px-[30px] py-[24px]"
                onClick={() => {
                  setSelectedTab(1);
                }}
              >
                <p
                  className={`${
                    selectedTab !== 1 && "text-gray-500 font-normal"
                  }`}
                >
                  Participant List
                </p>
                {selectedTab === 1 && (
                  <div className="absolute h-[4px] w-[100%] left-0 bottom-0 bg-[#D9D9D9]"></div>
                )}
              </button>
            )}
            <button
              className="relative text-[14px] md:text-[18px] px-[15px] md:px-[30px] py-[24px]"
              onClick={() => {
                setSelectedTab(2);
              }}
            >
              <p
                className={`${
                  selectedTab !== 2 && "text-gray-500 font-normal"
                }`}
              >
                Prize Winner
              </p>
              {selectedTab === 2 && (
                <div className="absolute h-[4px] w-[100%] left-0 bottom-0 bg-[#D9D9D9]"></div>
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="hidden md:flex flex-col items-center">
              <div className="flex flex-row items-center py-[20px] gap-[200px]">
                <div className="flex flex-row gap-[16px]">
                  <p className="text-primary-400 font-normal">
                    participants to date:
                  </p>
                  <p>{`${participants} people`}</p>
                </div>
                <PrimaryButton
                  onClick={endEvent}
                  disabled={activating}
                  className="w-[240px] h-[40px] text-[#1C1C1C]"
                >
                  Close the event
                </PrimaryButton>
              </div>
            </div>
            <div className="md:hidden">
              <div className="text-[14px] flex flex-row gap-[16px] py-[10px] justify-center">
                <p className="text-primary-400 font-normal">
                  participants to date:
                </p>
                <p>{`${participants} people`}</p>
              </div>
              <PrimaryButton
                onClick={endEvent}
                className="w-[100%] rounded-none h-[40px] text-[#1C1C1C]"
                disabled={activating}
              >
                Close the event
              </PrimaryButton>
            </div>
          </>
        )}
      </footer>
    );
  }

  return null;
}
