import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../context/AppContext";

const randomNum = () => Math.ceil(Math.random() * (19 - 1) + 1);

function useGrid(props) {
  const [board, setBoard] = useState([
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
    Array(20).fill(null),
  ]);
  const [knightX, setKnightX] = useState(0);
  const [knightY, setKnightY] = useState(0);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { score, setScore } = useContext(AppContext);
  useEffect(() => {
    spawnKnight(knightX, knightY);
    spawnCollectables();
    spawnDanger();
    // spawnDanger(2, 2);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleMovement);
    // console.log("2 effect fired");
    if (gameOverModal) {
      stopTimer();
      window.removeEventListener("keydown", handleMovement);
    }

    if (successModal) {
      stopTimer();
      window.removeEventListener("keydown", handleMovement);
    }

    if (!isGameStarted) {
      window.removeEventListener("keydown", handleMovement);
    }
    if (checkifWin()) {
      stopTimer();
      setSuccessModal(true);
    }

    return () => {
      window.removeEventListener("keydown", handleMovement);
      // stopTimer();
    };
  }, [knightX, knightY, isGameStarted]);

  const checkifWin = () => {
    console.log("in win");
    const remainingCollectables = board.map((item) =>
      item.some((item1) => item1?.props?.id == "collectable")
    );

    return remainingCollectables.indexOf(true) == -1;
  };
  const handleMovement = (e) => {
    if (e.key == "ArrowUp") {
      moveUp();
    }

    if (e.key == "ArrowDown") {
      moveDown();
    }

    if (e.key == "ArrowRight") {
      moveRight();
    }

    if (e.key == "ArrowLeft") {
      moveLeft();
    }
  };

  const moveRight = () => {
    if (knightY >= 19) return;

    if (board[knightX][knightY + 1]?.props?.id == "collectable") {
      setScore((prev) => prev + 10);
    }
    if (board[knightX][knightY + 1]?.props?.id == "danger") {
      setGameOverModal(true);
    }

    board[knightX][knightY] = null;
    board[knightX][knightY + 1] = (
      <img src="/assets/knight.png" className="image" />
    );
    setKnightY((prev) => prev + 1);
    setBoard([...board]);
  };

  const moveLeft = () => {
    if (knightY <= 0) return;
    if (board[knightX][knightY - 1]?.props?.id == "collectable") {
      setScore((prev) => prev + 10);
    }
    if (board[knightX][knightY - 1]?.props?.id == "danger") {
      setGameOverModal(true);
    }
    board[knightX][knightY] = null;
    board[knightX][knightY - 1] = (
      <img src="/assets/knight.png" className="image" />
    );
    setKnightY((prev) => prev - 1);
    setBoard([...board]);
  };

  const moveDown = () => {
    if (knightX >= 19) return;
    if (board[knightX + 1][knightY]?.props?.id == "collectable") {
      setScore((prev) => prev + 10);
    }
    if (board[knightX + 1][knightY]?.props?.id == "danger") {
      setGameOverModal(true);
    }
    board[knightX][knightY] = null;
    board[knightX + 1][knightY] = (
      <img src="/assets/knight.png" className="image" />
    );
    setKnightX((prev) => prev + 1);
    setBoard([...board]);
  };

  const moveUp = () => {
    if (knightX <= 0) return;
    if (board[knightX - 1][knightY]?.props?.id == "collectable") {
      setScore((prev) => prev + 10);
    }
    if (board[knightX - 1][knightY]?.props?.id == "danger") {
      setGameOverModal(true);
    }
    board[knightX][knightY] = null;
    board[knightX - 1][knightY] = (
      <img src="/assets/knight.png" className="image" />
    );
    setKnightX((prev) => prev - 1);
    setBoard([...board]);
  };

  const spawnKnight = (x, y) => {
    board[x][y] = <img src="/assets/knight.png" className="image" />;
    setBoard([...board]);
  };

  const spawnCollectables = () => {
    for (let i = 0; i < 4; i++) {
      board[randomNum()][randomNum()] = (
        <img id="collectable" src="/assets/collectable.png" className="image" />
      );
    }
    setBoard([...board]);
  };

  const spawnDanger = () => {
    for (let i = 0; i < 4; i++) {
      board[randomNum()][randomNum()] = (
        <img id="danger" src="/assets/danger.png" className="image" />
      );
    }
    setBoard([...board]);
  };

  const { timer, setTimer, setTimerInterval, timerInterval } =
    useContext(AppContext);
  let { milliseconds, seconds, minutes } = timer;

  const startTimer = () => {
    runTimer();
    setTimerInterval(setInterval(runTimer, 10));
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };
  const runTimer = () => {
    if (milliseconds >= 100) {
      seconds++;
      milliseconds = 0;
    }

    if (seconds >= 60) {
      minutes++;
      seconds = 0;
    }

    milliseconds++;
    return setTimer({ milliseconds, seconds, minutes });
  };

  return {
    board,
    setBoard,
    knightX,
    setKnightX,
    knightY,
    setKnightY,
    gameOverModal,
    setGameOverModal,
    successModal,
    setSuccessModal,
    isGameStarted,
    setIsGameStarted,
    score,
    setScore,
    milliseconds,
    seconds,
    minutes,
    startTimer,
  };
}

export default useGrid;
