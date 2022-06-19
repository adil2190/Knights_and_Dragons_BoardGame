import React from "react";
import { userInfo } from "../configs/details";
import { signOutUser } from "../services/firebaseService";
import MainButton from "./MainButton";

function Header(props) {
  return (
    <div className="h-[50px] shadow-lg bg-[#fff] mb-[25px] flex">
      <div>
        <img src="/assets/knight.png" alt="knight" className="image" />
        <p>{userInfo.fullName}</p>
      </div>

      <div>
        <MainButton label={"Sign out"} onClick={signOutUser} />
      </div>
    </div>
  );
}

export default Header;
