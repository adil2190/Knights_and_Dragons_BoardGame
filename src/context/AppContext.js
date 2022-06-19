import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState({
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    totalTime: 0,
  });
  const [timerInterval, setTimerInterval] = useState({});

  return (
    <AppContext.Provider
      value={{
        score,
        setScore,
        timer,
        setTimer,
        timerInterval,
        setTimerInterval,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
