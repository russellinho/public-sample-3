import React from "react";
import { classNames } from "../../utils/helpers";

const style = {
  layout: "flex items-center space-x-1",
  dotLayout: "relative flex h-2 w-2",
  animation: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
  dot: "relative inline-flex rounded-full h-2 w-2",
  text: "text-[13px]",
};

export enum EventState {
  Ongoing,
  Closing,
}

const colorPreset: Record<EventState, Record<string, string>> = {
  [EventState.Ongoing]: {
    bg: "bg-[#FBFF48]",
    text: "text-[#FBFF48]",
  },
  [EventState.Closing]: {
    bg: "bg-[#06D270]",
    text: "text-[#06D270]",
  },
};

const text: Record<EventState, string> = {
  [EventState.Ongoing]: "Ongoing",
  [EventState.Closing]: "Closing",
};

function StateIndicator({ state, blink }: { state: EventState; blink?: boolean }) {
  return (
    <div className={style.layout}>
      {/* Blinking Dot */}
      <span className={style.dotLayout}>
        {blink && <span className={classNames(style.animation, colorPreset[state].bg)}></span>}
        <span className={classNames(style.dot, colorPreset[state].bg)}></span>
      </span>

      {/* State */}
      <span className={classNames(style.text, colorPreset[state].text)}>{text[state]}</span>
    </div>
  );
}

export default StateIndicator;
