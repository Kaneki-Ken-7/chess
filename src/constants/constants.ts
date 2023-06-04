export const HORIZONTALAXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const VERTICALAXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const GRIDSIZE = 100

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

export function samePosition( p1:Position, p2:Position){
  return p1.x === p2.x && p1.y === p2.y
}


export let piece:Pieces[] =[] 
  piece.push({ image: `/rookB.png`,position:{x:7,y:7} ,type:PieceType.ROOK,team:TeamType.BLACK});
  piece.push({ image: `/rookB.png`,position:{x:0,y:7} ,type:PieceType.ROOK,team:TeamType.BLACK});
  piece.push({ image: `/rookW.png`,position:{x:7,y:0}  ,type:PieceType.ROOK,team:TeamType.WHITE});
  piece.push({ image: `/rookW.png`,position:{x:0,y:0}  ,type:PieceType.ROOK,team:TeamType.WHITE});
  piece.push({ image: `/knightB.png`,position:{x:1,y:7} ,type:PieceType.KNIGHT,team:TeamType.BLACK });
  piece.push({ image: `/knightB.png`,position:{x:6,y:7} ,type:PieceType.KNIGHT,team:TeamType.BLACK});
  piece.push({ image: `/knightW.png`,position:{x:1,y:0} ,type:PieceType.KNIGHT,team:TeamType.WHITE });
  piece.push({ image: `/knightW.png`,position:{x:6,y:0} ,type:PieceType.KNIGHT,team:TeamType.WHITE});
  piece.push({ image: `/bishopB.png`,position:{x:2,y:7} ,type:PieceType.BISHOP,team:TeamType.BLACK});
  piece.push({ image: `/bishopB.png`,position:{x:5,y:7}  ,type:PieceType.BISHOP,team:TeamType.BLACK});
  piece.push({ image: `/bishopW.png`,position:{x:2,y:0} ,type:PieceType.BISHOP,team:TeamType.WHITE});
  piece.push({ image: `/bishopW.png`,position:{x:5,y:0}  ,type:PieceType.BISHOP,team:TeamType.WHITE});
  piece.push({ image: `/kingB.png`,position:{x:4,y:7} ,type:PieceType.KING,team:TeamType.BLACK});
  piece.push({ image: `/queenB.png`,position:{x:3,y:7} ,type:PieceType.QUEEN,team:TeamType.BLACK});
  piece.push({ image: `/kingW.png`,position:{x:4,y:0} ,type:PieceType.KING,team:TeamType.WHITE});
  piece.push({ image: `/queenW.png`,position:{x:3,y:0} ,type:PieceType.QUEEN,team:TeamType.WHITE});


for (let i = 0; i < 2; i++) {
  const team = i===0 ? TeamType.WHITE:TeamType.BLACK
  const type = i === 0 ? "W" : "B";
  const x = i === 0 ? 1 : 6;
  for (let j = 0; j < 8; j++) {
    piece.push({ image: `/pawn${type}.png`,position:{x:j,y:x},type:PieceType.PAWN,team});
  }
}