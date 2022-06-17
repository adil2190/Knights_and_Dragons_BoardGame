import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TimerCard from "./TimerCard";

function Timer({ milliseconds, seconds, minutes, ...props }) {
  return (
    <div className="flex">
      <TimerCard
        label={"minutes"}
        time={minutes < 10 ? `0${minutes}` : minutes}
      />
      <p className="mt-[10px] text-[30px] font-bold mx-[7px]">:</p>
      <TimerCard
        label={"seconds"}
        time={seconds < 10 ? `0${seconds}` : seconds}
      />
      <p className="mt-[10px] text-[30px] font-bold mx-[7px]">:</p>
      <TimerCard
        label={"milliseconds"}
        time={milliseconds < 10 ? `0${milliseconds}` : milliseconds}
      />
    </div>
  );
}

export default Timer;
