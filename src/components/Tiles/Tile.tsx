import React from "react";
import "./tile.css";


type Props = {
  number: number;
  image?: string;
  highlight:boolean
};

const Tile = (props: Props) => {
  const classname = ["tile",props.number % 2 === 0 && "whitetile",props.number % 2 !== 0 && "blacktile",props.highlight && "tile-highlight",props.image && "chess-piece-tile"].filter(Boolean).join(" ");
    return (
      <div className={classname}>
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
};



export default Tile;
