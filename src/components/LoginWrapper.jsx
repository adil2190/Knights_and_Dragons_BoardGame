import React, { useState } from "react";
import MainButton from "./MainButton";
import MainInput from "./MainInput";
import { Link } from "react-router-dom";
import { signInUser } from "../services/firebaseService";
import { getUser } from "../services/gameService";

function LoginWrapper(props) {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await signInUser(data.email, data.password);
      const user = await getUser(res.user.uid);
      localStorage.setItem("knightUser", JSON.stringify(user.data.message));
      window.location.reload();
    } catch (err) {
      setError(err);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="h-[400px] w-[500px] bg-[#f5f5f5] rounded-lg shadow-md">
      <h1 className="text-[#f9c802] text-[25px] text-center mt-[30px] font-bold">
        Sign In
      </h1>
      <form onSubmit={onLogin} className="w-[80%] mt-[30px] mx-auto">
        <MainInput
          type="email"
          inputLabel={"Email"}
          value={data.email}
          onChange={(e) => {
            setError("");
            setData({ ...data, email: e.target.value });
          }}
        />
        <div className="h-[20px]" />
        <MainInput
          inputLabel={"Password"}
          type="password"
          value={data.password}
          onChange={(e) => {
            setError("");
            setData({ ...data, password: e.target.value });
          }}
        />
        {error && (
          <p className="text-red-700 text-[13px] text-center mt-2 ">{error}</p>
        )}
        <div className="flex justify-center mt-[30px] ">
          <MainButton type="submit" label={"Login"} loading={loader} />
        </div>
        <div className="flex items-center my-[10px]">
          <div className="h-[1px] bg-[#d5d5d5] w-[45%]" />
          <p className="mx-[10px]">Or</p>
          <div className="h-[1px] bg-[#d5d5d5] w-[45%]" />
        </div>
      </form>
      <Link
        className="text-center flex justify-center underline text-blue-700 text-[14px]"
        to={"/signup"}
      >
        Create new account
      </Link>
    </div>
  );
}

export default LoginWrapper;
