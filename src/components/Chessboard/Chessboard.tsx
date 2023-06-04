"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./chessboard.css";
import Tile from "../Tiles/Tile";
import Rules from "../../rules/rules";
import { Pieces, TeamType, PieceType, verticalAxis, horizontalAxis, piece, Position } from "@/constants/constants";
type Props = {};



const Chessboard = (props: Props) => {
  let board = [];
  const [pieces,setPieces] = useState<Pieces[]>(piece);
  const chessboardref = useRef<HTMLDivElement>(null);
  const [activePiece, setActivePiece] = useState< HTMLElement | null >(null)
  const [grabPostion, setGrabPosition] = useState<Position | null>(null);
  const [gridX, setGridX] = useState(0)
  const [gridY, setGridY] = useState(0)
  const rules = new Rules();
  function grabPiece(event: React.MouseEvent) {
    const element = event.target as HTMLElement;
    const chessboard = chessboardref.current
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((event.clientX - chessboard.offsetLeft)/100));
      setGridY(Math.abs(Math.ceil((event.clientY - chessboard.offsetTop - 800)/100)))
      const x = event.clientX - 40;
      const y = event.clientY - 40;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element)
    }
  }
  function movePiece(event: React.MouseEvent) {
    const chessboard = chessboardref.current
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 15;
      const minY = chessboard.offsetTop - 10;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 55;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 60;
      const x = event.clientX - 40;
      const y = event.clientY - 40;
      activePiece.style.position = "absolute";
      activePiece.style.left = (x<minX)? `${minX}px`:(x> maxX)?`${maxX}`:`${x}px`;
      activePiece.style.top = (y<minY)?`${minY}px`:(y> maxY)?`${maxY}`:`${y}px`;
    }
  }
  function dropPiece(event: React.MouseEvent) {
    const chessboard = chessboardref.current
    if (activePiece && chessboard) {
      const x = Math.floor((event.clientX - chessboard.offsetLeft)/100);
      const y = Math.abs(Math.ceil((event.clientY - chessboard.offsetTop -800)/100));
      
      const currentPiece = pieces.find(p=> p.position.x === gridX && p.position.y === gridY);
      const attackedPiece = pieces.find(p=> p.position.x === x && p.position.y === y);

      
      if(currentPiece){
        const validMove = rules.isValid(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);
        const isEnpassantMove = rules.isEnpassantMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces)
        const pawnDirection = currentPiece.team === TeamType.WHITE ? 1 : -1;
        console.log( isEnpassantMove);
        
        if(isEnpassantMove){ 
          const updatedPieces = pieces.reduce((result,piece)=>{ 
            if(piece.position.x === gridX && piece.position.y === gridY){
              piece.enPassant = true
              piece.position.x = x;
              piece.position.y = y;
              result.push(piece)
            }else if(!(piece.position.x === x && piece.position.y === y- pawnDirection)){   
              if(piece.type === PieceType.PAWN){
                piece.enPassant = false;
              }           
              result.push(piece)
            }
            return result
          },[] as Pieces[])

          setPieces(updatedPieces);

        } else if(validMove){
          const updatedPieces = pieces.reduce((result,piece)=>{
            if(piece.position.x === gridX && piece.position.y === gridY){
              if(Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN){
                console.log("enpassant true");
                
                piece.enPassant = true;
              }else{
                console.log("enpassant false");

                piece.enPassant = false;
              }
              piece.position.x = x;
              piece.position.y = y;
              // console.log("piece : ",piece);              
              result.push(piece)
            }else if(!(piece.position.x === x && piece.position.y === y)){   
              if(piece.type === PieceType.PAWN){
                piece.enPassant = false;
              }           
              result.push(piece)
            }
            return result
          },[] as Pieces[])

          setPieces(updatedPieces);
      
        }else{
            activePiece.style.position = "relative";
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null)
    }
  }
  for (let j = verticalAxis.length-1;j>=0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let num = i + j + 2;
      let image = undefined;
      pieces.forEach((p) => {
        if (p.position.x === i && p.position.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${i},${j}`} number={num} image={image} />);
    }
  }
  
 
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      className="chessboard"
      ref={chessboardref}
    >
      {board}
    </div>
  );
};

export default Chessboard;
