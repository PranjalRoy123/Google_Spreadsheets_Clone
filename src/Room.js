import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Cell from "./Cell";
import "./Room.css";

export default function Room() {
  const [socket, setSocket] = useState(io("http://localhost:5000"));

  const { code } = useParams();

  const [grid, setGrid] = useState([[]]);

  const [gridLayout, setGridLayout] = useState([[]]);

  const [xSelected, setX] = useState(0);
  const [ySelected, setY] = useState(0);

  function updateLayout(g) {
    function cellChange(x, y, v) {
      const g = grid;
      g[y][x] = v;
      setGrid(g);
    }

    function cellClick(x, y) {
      setX(x);
      setY(y);
    }

    const newGrid = [];
    g.forEach((item, y) => {
      item.forEach((text, x) => {
        newGrid.push(
          <Cell
            key={[x, y]}
            x={x}
            y={y}
            value={text}
            edit={xSelected === x && ySelected === y ? true : false}
            changeHandler={cellChange}
            clickHandler={cellClick}
          />
        );
      });
    });
    setGridLayout(newGrid);
  }

  useEffect(() => {
    updateLayout(grid);
  }, [grid, xSelected, ySelected]);

  useEffect(() => {
    if (socket === null || code === null) return;
    socket.emit("join-room", code);
  }, [socket, code]);

  useEffect(() => {
    const getGridFunc = (data) => {
      setGrid(data.grid);
    };

    socket.on("get-room-data", getGridFunc);

    return () => {
      socket.off("get-room-data", getGridFunc);
    };
  }, [socket]);

  return (
    <div className="grid">
      <div
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, 200px)`,
        }}
      >
        {gridLayout}
      </div>
    </div>
  );
}
