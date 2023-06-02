import React from "react";
import "./tile.css";
import Image from "next/image";
import pawn from "../../../public/pawn.png";
import pawnW from "../../../public/pawnW.png";
import bishop from "../../../public/bishop.png";
import bishopW from "../../../public/bishopW.png";
import rook from "../../../public/rook.png";
import rookW from "../../../public/rookW.png";
import knight from "../../../public/knight.png";
import knightW from "../../../public/knightW.png";
import king from "../../../public/king.png";
import kingW from "../../../public/kingW.png";
import queen from "../../../public/queen.png";
import queenW from "../../../public/queenW.png";
type Props = {
  number: number;
  image?: string;
};

const Tile = (props: Props) => {
  if (props.number % 2 === 0) {
    return (
      <div className="tile whitetile">
        {props.image && (
          <div
            className="chess-piece"
            style={{
              backgroundImage: `url("${props.image}")`,
              width: 70,
              height: 70,
            }}
          ></div>
        )}
      </div>
    );
  } else {
    {
      return (
        <div className="tile blacktile">
          {props.image && (
            <div
              className="chess-piece"
              style={{
                backgroundImage: `url("${props.image}")`,
                width: 70,
                height: 70,
              }}
            ></div>
          )}
        </div>
      );
    }
  }
};

export default Tile;
