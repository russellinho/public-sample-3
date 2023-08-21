import ReactDOMServer from "react-dom/server";
import Image from "next/image";
import ReactTooltip from "react-tooltip";

export default function LaunchMissionTooltip() {
  const dataTip = ReactDOMServer.renderToString(
    <div className="text-body3 text-gray-500 truncate z-10">
      You are creating a smart contract!
      <br />
      for more info check
      <br className="hidden md:block" />{" "}
      <a
        href="#"
        target="_blank"
        className="font-bold text-neon-lemon underline hover:cursor-pointer z-10"
        rel="noreferrer"
      >{`"How to use escrow"`}</a>
    </div>
  );

  return (
    <div className="w-[36px] h-[36px]">
      <a
        data-for="custom-event"
        data-html={true}
        data-tip={dataTip}
        data-event="click focus"
        className=""
      >
        <div>
          <Image
            src="/icons/ic_info.svg"
            width={36}
            height={36}
            alt="ic_info"
          />
        </div>
      </a>
      <ReactTooltip
        id="custom-event"
        effect="solid"
        place="right"
        clickable={true}
        backgroundColor="#000"
        globalEventOff="click"
      />
    </div>
  );
}
