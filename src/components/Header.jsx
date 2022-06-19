import React from "react";
import { Link } from "react-router-dom";
import { userInfo } from "../configs/details";
import { signOutUser } from "../services/firebaseService";
import MainButton from "./MainButton";

function Header(props) {
  return (
    <div className="h-[50px] shadow-lg bg-[#fff] mb-[25px] flex justify-between">
      <div className="flex items-center mx-[10px]">
        <Link to={"/home"}>
          <img src="/assets/knight.png" alt="knight" className="image" />
        </Link>
        <div className="w-[10px]" />
        <p className="text-[#444] font-semibold">{userInfo.fullName}</p>
      </div>

      <div className="flex items-center">
        <Link to={"leaderboard"}>
          <MainButton label={"Leaderboard"} />
        </Link>
        <div className="w-[10px]" />
        <Link to={"history"}>
          <MainButton label={"History"} />
        </Link>
        <div className="w-[10px]" />
        <MainButton label={"Sign out"} onClick={signOutUser} />
        <div className="w-[10px]" />
      </div>
    </div>
  );
}

export default Header;
