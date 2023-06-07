import { Pieces, PieceType, Position, samePosition, TeamType } from "@/constants/constants";
import Rules from "./rules";
const pawnRule =(desiredPosition:Position,initialPosition:Position,team:TeamType,boardState:Pieces[]):boolean=>{
    const rules = new Rules();
    
    if(!samePosition(desiredPosition,initialPosition)){
        const specialRow = team === TeamType.WHITE ? 1 : 6;
        const pawnDirection = team === TeamType.WHITE ? 1 : -1;
        //PAWN Movement Logic
        if(initialPosition.y === specialRow && initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === 2*pawnDirection){
            if(!rules.isTileOccupied(desiredPosition,boardState) && !rules.isTileOccupied({x:desiredPosition.x,y:desiredPosition.y-pawnDirection},boardState)){
                return true;
            }
        }else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
                if(!rules.isTileOccupied(desiredPosition,boardState)){
                    return true;
                }     
        }
        //PAWN Attacking Logic
        else if(desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection){
            if(rules.tileIsOccupiedByOpponent(desiredPosition,boardState,team)){
                return true
            }
        }
        else if(desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection){
            if(rules.tileIsOccupiedByOpponent(desiredPosition,boardState,team)){
                return true
            }
        }
    }
    return false
}

export const getPossiblePawnMoves = (pawn:Pieces, boardState:Pieces[]):Position[]=>{
    let position: Position[] = []
    const rules = new Rules();
    const pawnDirection = pawn.team === TeamType.WHITE? 1: -1;
    let leftPosition = {x:pawn.position.x-1,y:pawn.position.y};
    let rightPosition = {x:pawn.position.x+1,y:pawn.position.y};
    if(!rules.isTileOccupied({x:pawn.position.x, y:pawn.position.y + pawnDirection},boardState)){
        const specialRow = pawn.team === TeamType.WHITE ? 1 : 6;
        if(pawn.position.y === specialRow && !rules.isTileOccupied({x:pawn.position.x, y:pawn.position.y + pawnDirection + pawnDirection},boardState)){
            position.push({x:pawn.position.x, y:pawn.position.y + pawnDirection + pawnDirection})
        }
        position.push({x:pawn.position.x, y:pawn.position.y + pawnDirection})
    }
    for (let i = -1; i < 2; i+=2) {
        if(rules.isTileOccupied({x:pawn.position.x + i, y:pawn.position.y + pawnDirection},boardState)){
            if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x + i,y:pawn.position.y + pawnDirection},boardState,pawn.team)){
                position.push({x:pawn.position.x + i,y:pawn.position.y + pawnDirection})
            }    
        }else if(!rules.isTileOccupied({x:pawn.position.x + i, y:pawn.position.y + pawnDirection},boardState)) {
            const leftPiece = boardState.find(p=> samePosition(p.position,leftPosition))
            if(leftPiece && leftPiece.type === PieceType.PAWN && leftPiece.enPassant){
                position.push({x:leftPosition.x,y:leftPosition.y + pawnDirection})
            }
            const rightPiece = boardState.find(p=> samePosition(p.position,rightPosition))
            if(rightPiece && rightPiece.type === PieceType.PAWN && rightPiece.enPassant){
                position.push({x:rightPosition.x,y:rightPosition.y + pawnDirection})

            }
        }
    }
    return position;
  }

export default pawnRule;
