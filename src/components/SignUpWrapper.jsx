import React, { useState } from "react";
import MainButton from "./MainButton";
import MainInput from "./MainInput";
import { Link } from "react-router-dom";
import { createUser } from "../services/firebaseService";
import { addUser } from "../services/gameService";

function SignUpWrapper(props) {
  const [data, setData] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await createUser(data.email, data.password);
      const addRes = await addUser({ ...data, id: res.user.uid, password: "" });
      console.log(addRes);
      localStorage.setItem(
        "knightUser",
        JSON.stringify({
          ...data,
          id: res.user.uid,
          password: "",
        })
      );
      window.location.reload();
    } catch (err) {
      setError(err);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="h-[450px] w-[500px] bg-[#f5f5f5] rounded-lg shadow-md">
      <h1 className="text-[#f9c802] text-[25px] text-center mt-[30px] font-bold">
        Create Account
      </h1>
      <form onSubmit={onSignUp} className="w-[80%] mt-[30px] mx-auto">
        <MainInput
          type="text"
          inputLabel={"Full Name"}
          value={data.fullName}
          onChange={(e) => {
            setError("");
            setData({ ...data, fullName: e.target.value });
          }}
        />
        <div className="h-[20px]" />
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
          <MainButton type="submit" label={"Sign up"} loading={loader} />
        </div>
      </form>
    </div>
  );
}

export default SignUpWrapper;
