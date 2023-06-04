import React from "react";
import "./tile.css";


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
