import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { userInfo } from "../configs/details";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

function Router(props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={userInfo ? <Navigate to={"/home"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={userInfo ? <Navigate to={"/home"} /> : <SignUp />}
          />

          <Route
            path="/home/*"
            element={userInfo ? <Home /> : <Navigate to={"/"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
