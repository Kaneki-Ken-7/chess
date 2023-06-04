"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./chessboard.css";
import Tile from "../Tiles/Tile";
import Rules from "../../rules/rules";
import { Pieces, TeamType, PieceType, HORIZONTALAXIS, VERTICALAXIS, piece, Position, GRIDSIZE, samePosition } from "@/constants/constants";
type Props = {};



const Chessboard = (props: Props) => {
  let board = [];
  const [pieces,setPieces] = useState<Pieces[]>(piece);
  const chessboardref = useRef<HTMLDivElement>(null);
  const [activePiece, setActivePiece] = useState< HTMLElement | null >(null)
  const [grabPosition, setGrabPosition] = useState<Position >({x:-1,y:-1});
  const rules = new Rules();
  function grabPiece(event: React.MouseEvent) {
    const element = event.target as HTMLElement;
    const chessboard = chessboardref.current
    if (element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((event.clientX - chessboard.offsetLeft)/GRIDSIZE);
      const grabY = Math.abs(Math.ceil((event.clientY - chessboard.offsetTop - 800)/GRIDSIZE))
      setGrabPosition({x:grabX,y:grabY})
      const x = event.clientX - GRIDSIZE/2;
      const y = event.clientY - GRIDSIZE/2;
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
      const x = event.clientX - GRIDSIZE/2;
      const y = event.clientY - GRIDSIZE/2;
      activePiece.style.position = "absolute";
      activePiece.style.left = (x<minX)? `${minX}px`:(x> maxX)?`${maxX}`:`${x}px`;
      activePiece.style.top = (y<minY)?`${minY}px`:(y> maxY)?`${maxY}`:`${y}px`;
    }
  }
  function dropPiece(event: React.MouseEvent) {
    const chessboard = chessboardref.current
    if (activePiece && chessboard) {
      const x = Math.floor((event.clientX - chessboard.offsetLeft)/ GRIDSIZE);
      const y = Math.abs(Math.ceil((event.clientY - chessboard.offsetTop -800)/GRIDSIZE));
      
      const currentPiece = pieces.find(p=> samePosition(p.position,grabPosition));

      
      if(currentPiece){
        const validMove = rules.isValid(grabPosition,{ x, y}, currentPiece.type, currentPiece.team, pieces);
        const isEnpassantMove = rules.isEnpassantMove(grabPosition, {x, y}, currentPiece.type, currentPiece.team, pieces)
        const pawnDirection = currentPiece.team === TeamType.WHITE ? 1 : -1;
        // console.log( isEnpassantMove);
        
        if(isEnpassantMove){ 
          const updatedPieces = pieces.reduce((result,piece)=>{ 
            if(samePosition(piece.position,grabPosition)){
              piece.enPassant = true
              piece.position.x = x;
              piece.position.y = y;
              result.push(piece)
            }else if(!samePosition(piece.position,{x:x,y:y- pawnDirection})){   
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
            if(samePosition(piece.position,grabPosition)){
              piece.enPassant = Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN
              piece.position.x = x;
              piece.position.y = y;
              // console.log("piece : ",piece);              
              result.push(piece)
            }else if(!samePosition(piece.position,{x:x,y:y})){   
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
  for (let j = VERTICALAXIS.length-1;j>=0; j--) {
    for (let i = 0; i < HORIZONTALAXIS.length; i++) {
      let num = i + j + 2;
      const piece = pieces.find(p=> samePosition(p.position, {x:i,y:j}))
      let image = piece ? piece.image: undefined;
     
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
