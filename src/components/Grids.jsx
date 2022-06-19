import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import useGrid from "../hooks/useGrid";
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

function Grids(props) {
  const {
    board,
    gameOverModal,
    setGameOverModal,
    successModal,
    setSuccessModal,
    isGameStarted,
    setIsGameStarted,
    milliseconds,
    seconds,
    minutes,
    startTimer,
  } = useGrid();

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
        h-[180px]
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
