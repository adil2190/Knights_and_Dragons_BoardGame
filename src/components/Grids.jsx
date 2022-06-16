import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cell from "./Cell";

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
  const [board, setBoard] = useState([
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
  ]);
  const [knightX, setKnightX] = useState(0);
  const [knightY, setKnightY] = useState(0);

  useEffect(() => {
    spawnKnight(knightX, knightY);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleMovement);
    console.log("2 effect fired");
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
    if (knightY >= 9) return;
    board[knightX][knightY] = null;
    board[knightX][knightY + 1] = (
      <img src="/assets/knight.png" className="image" />
    );
    setKnightY((prev) => prev + 1);
    setBoard([...board]);
  };

  const moveLeft = () => {
    if (knightY <= 0) return;
    board[knightX][knightY] = null;
    board[knightX][knightY - 1] = (
      <img src="/assets/knight.png" className="image" />
    );
    setKnightY((prev) => prev - 1);
    setBoard([...board]);
  };

  const moveDown = () => {
    if (knightX >= 9) return;
    board[knightX][knightY] = null;
    board[knightX + 1][knightY] = (
      <img src="/assets/knight.png" className="image" />
    );
    setKnightX((prev) => prev + 1);
    setBoard([...board]);
  };

  const moveUp = () => {
    if (knightX <= 0) return;
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

  return (
    <div id="game_board">
      {board.map((item, index) => {
        return (
          <div style={{ backgroundColor: "#999", display: "flex" }}>
            {item.map((item1, index1) => (
              <Cell
                onClick={() => {
                  // setKnightX((prev) => prev + 1);
                  // console.log(knightX);
                  // spawnKnight(index, index1);
                  moveRight();
                }}
              >
                {item1}
              </Cell>
            ))}
          </div>
        );
      })}
    </div>
  );
}
export default Grids;
