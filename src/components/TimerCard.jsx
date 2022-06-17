import React from "react";

function TimerCard({ time, label, ...props }) {
  return (
    <div>
      <div
        className="w-[60px] h-[60px] 
    bg-[#fff] rounded-md 
    shadow-md text-[#EF1452]
    flex justify-center items-center
    font-bold text-[25px]
    "
      >
        {time}
      </div>
      <p className="text-center text-[12px] font-semibold text-[#555] mt-[5px]">
        {label}
      </p>
    </div>
  );
}

export default TimerCard;
