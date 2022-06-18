import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import Cell from "./Cell";
import MainButton from "./MainButton";
import MainModal from "./modals/GameOverModal";
import VictoryModal from "./modals/VictoryModal";
import Score from "./Score";
import Timer from "./Timer";

// function Grids(props) {
//   const [cells, setCells] = useState([]);

//   useEffect(() => {
//     setCells(createCells());
//   }, []);

//   const createCells = () => {
//     const localCells = [];
//     for (let i = 0; i < 400; i++) {
//       localCells.push(<Cell x={i % 20} />);
//     }
//     return localCells;
//   };

//   return <div id="game_board">{cells}</div>;
// }

const randomNum = () => Math.ceil(Math.random() * (19 - 1) + 1);

function Grids(props) {
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

  return (
    <div id="game_board">
      <div className="timer flex_center">
        <div>
          <Timer
            milliseconds={milliseconds}
            minutes={minutes}
            seconds={seconds}
          />
          {/* <MainButton label={"Stop"} onClick={stopTimer} /> */}
        </div>
      </div>
      {isGameStarted ? (
        <div>
          {board.map((item, index) => {
            return (
              <div style={{ backgroundColor: "#999", display: "flex" }}>
                {item.map((item1, index1) => (
                  <Cell
                    key={index1}
                    onClick={() => {
                      console.log(item1);
                    }}
                  >
                    {item1}
                  </Cell>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="w-[740px] text-center 
        text-[#f9c802] text-[60px] 
        font-bold cursor-pointer bg-[#fff] 
        flex justify-center items-center 
        rounded-lg shadow-md
        "
          onClick={() => {
            startTimer();
            setIsGameStarted(true);
          }}
        >
          Start Playing!
        </div>
      )}
      <div className="score flex_center">
        <Score />
      </div>
      {gameOverModal && (
        <MainModal closeModal={() => setGameOverModal(false)} />
      )}
      {successModal && (
        <VictoryModal closeModal={() => setSuccessModal(false)} />
      )}
    </div>
  );
}
export default Grids;
