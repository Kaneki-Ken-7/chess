"use client";
import React, { MouseEvent } from "react";
import Image from "next/image";
import "./chessboard.css";
import Tile from "../Tiles/Tile";
type Props = {};

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Pieces {
  image: string;
  x: number;
  y: number;
}

let pieces: Pieces[] = [];

for (let i = 0; i < 2; i++) {
  const type = i === 0 ? "B" : "W";
  const x = i === 0 ? 0 : 7;
  pieces.push({ image: `/rook${type}.png`, x: x, y: 0 });
  pieces.push({ image: `/rook${type}.png`, x: x, y: 7 });
  pieces.push({ image: `/knight${type}.png`, x: x, y: 1 });
  pieces.push({ image: `/knight${type}.png`, x: x, y: 6 });
  pieces.push({ image: `/bishop${type}.png`, x: x, y: 2 });
  pieces.push({ image: `/bishop${type}.png`, x: x, y: 5 });
  pieces.push({ image: `/king${type}.png`, x: x, y: 4 });
  pieces.push({ image: `/queen${type}.png`, x: x, y: 3 });
}
for (let i = 0; i < 2; i++) {
  const type = i === 0 ? "B" : "W";
  const x = i === 0 ? 1 : 6;
  for (let j = 0; j < 8; j++) {
    pieces.push({ image: `/pawn${type}.png`, x: x, y: j });
  }
}

let activePiece: HTMLElement | null = null;

const Chessboard = (props: Props) => {
  let board = [];

  for (let i = 0; i < verticalAxis.length; i++) {
    for (let j = 0; j < horizontalAxis.length; j++) {
      let num = i + j + 2;
      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${i},${j}`} number={num} image={image} />);
    }
  }
  function movePiece(event: React.MouseEvent) {
    if (activePiece) {
      const x = event.clientX - 40;
      const y = event.clientY - 40;
      activePiece.style.position = "absolute";
      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
    }
  }
  function dropPiece(event: React.MouseEvent) {
    if (activePiece) {
      activePiece = null;
    }
  }
  function grabPiece(event: React.MouseEvent) {
    const element = event.target as HTMLElement;

    if (element.classList.contains("chess-piece")) {
      const x = event.clientX - 40;
      const y = event.clientY - 40;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      activePiece = element;
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      className="chessboard"
    >
      {board}
    </div>
  );
};

export default Chessboard;
