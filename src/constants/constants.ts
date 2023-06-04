export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

export interface Position {
  x:number;
  y:number;
}

export interface Pieces {
  image: string;
  position:Position;
  type:PieceType;
  team:TeamType;
  enPassant?:boolean;
}

export enum TeamType{
  BLACK,WHITE
}

export enum PieceType {
  PAWN,ROOK,KNIGHT,BISHOP,QUEEN,KING
}

export let piece:Pieces[] =[] 
for (let i = 0; i < 2; i++) {
  const team = i===0 ? TeamType.WHITE:TeamType.BLACK
  const type = i === 0 ? "W" : "B";
  const y = i === 0 ? 0 : 7;
  piece.push({ image: `/rook${type}.png`,position:{x:0,y:y} ,type:PieceType.ROOK,team});
  piece.push({ image: `/rook${type}.png`,position:{x:7,y:y}  ,type:PieceType.ROOK,team});
  piece.push({ image: `/knight${type}.png`,position:{x:1,y:y} ,type:PieceType.KNIGHT,team });
  piece.push({ image: `/knight${type}.png`,position:{x:6,y:y} ,type:PieceType.KNIGHT,team});
  piece.push({ image: `/bishop${type}.png`,position:{x:2,y:y} ,type:PieceType.BISHOP,team});
  piece.push({ image: `/bishop${type}.png`,position:{x:5,y:y}  ,type:PieceType.BISHOP,team});
  piece.push({ image: `/king${type}.png`,position:{x:4,y:y} ,type:PieceType.KING,team});
  piece.push({ image: `/queen${type}.png`,position:{x:3,y:y} ,type:PieceType.QUEEN,team});
}

for (let i = 0; i < 2; i++) {
  const team = i===0 ? TeamType.WHITE:TeamType.BLACK
  const type = i === 0 ? "W" : "B";
  const x = i === 0 ? 1 : 6;
  for (let j = 0; j < 8; j++) {
    piece.push({ image: `/pawn${type}.png`,position:{x:j,y:x},type:PieceType.PAWN,team});
  }
}