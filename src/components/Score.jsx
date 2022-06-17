import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Score(props) {
  const { score } = useContext(AppContext);
  return (
    <div className="h-[160px] w-[180px] bg-white shadow-md rounded-md text-[#F1C40F] ">
      <div className="flex items-center justify-center">
        <p className="text-[20px] font-bold mr-[5px]">Score</p>
        <img src="/assets/star.png" alt="star" className="w-[25px]" />
      </div>
      <div className="w-[90%] mx-auto h-[1px] my-[5px] bg-[#f1f1f1]" />
      <div className="h-[60%] flex justify-center items-center text-[60px]">
        {score}
      </div>
    </div>
  );
}

export default Score;
