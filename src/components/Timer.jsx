import React from "react";
import TimerCard from "./TimerCard";

function Timer(props) {
  return (
    <div className="flex">
      <TimerCard label={"minutes"} time={"00"} />
      <p className="mt-[10px] text-[30px] font-bold mx-[7px]">:</p>
      <TimerCard label={"seconds"} time={"00"} />
      <p className="mt-[10px] text-[30px] font-bold mx-[7px]">:</p>
      <TimerCard label={"milliseconds"} time={"00"} />
    </div>
  );
}

export default Timer;
