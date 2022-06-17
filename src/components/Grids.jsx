import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import Cell from "./Cell";
import MainButton from "./MainButton";
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

  const { setScore } = useContext(AppContext);
  useEffect(() => {
    spawnKnight(knightX, knightY);
    spawnCollectables();
    // spawnDanger(2, 2);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleMovement);
    // console.log("2 effect fired");
    return () => window.removeEventListener("keydown", handleMovement);
  }, [knightX, knightY]);

  const handleMovement = (e) => {
    if (e.key == "ArrowUp") {
      console.log("up");
      moveUp();
    }

    if (e.key == "ArrowDown") {
      console.log("down");
      moveDown();
    }

    if (e.key == "ArrowRight") {
      console.log("right");
      moveRight();
    }

    if (e.key == "ArrowLeft") {
      console.log("left");
      moveLeft();
    }
  };

  const moveRight = () => {
    if (knightY >= 19) return;

    if (board[knightX][knightY + 1]?.props?.id == "collectable") {
      console.log("on collect right");
      setScore((prev) => prev + 10);
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
      console.log("on collect left");
      setScore((prev) => prev + 10);
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
      console.log("on collect down");
      setScore((prev) => prev + 10);
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
      console.log("on collect up");
      setScore((prev) => prev + 10);
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
    for (let i = 0; i < 3; i++) {
      board[randomNum()][randomNum()] = (
        <img id="collectable" src="/assets/collectable.png" className="image" />
      );
    }
    setBoard([...board]);
  };

  const spawnDanger = (x, y) => {
    board[x][y] = (
      <img id="danger" src="/assets/danger.png" className="image" />
    );
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
          <MainButton label={"Start"} onClick={startTimer} />
          <Timer
            milliseconds={milliseconds}
            minutes={minutes}
            seconds={seconds}
          />
          <MainButton label={"Stop"} onClick={stopTimer} />
        </div>
      </div>
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
      <div className="score flex_center">
        <Score />
      </div>
    </div>
  );
}
export default Grids;
