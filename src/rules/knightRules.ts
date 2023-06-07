import { Pieces, Position, samePosition, TeamType } from "@/constants/constants";
import Rules from "./rules";

const knightRule =(desiredPosition:Position,initialPosition:Position,team:TeamType,boardState:Pieces[]):boolean=>{
    const rules = new Rules();
    if(!samePosition(desiredPosition,initialPosition)){
        for (let i = -1; i < 2; i+=2) {
            for (let j = -1; j < 2; j+=2) {
                if(desiredPosition.y - initialPosition.y === 2 * i){
                    if(desiredPosition.x - initialPosition.x === j){
                        if(rules.tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                            return true;
                        }   
                    }
                }
                if(desiredPosition.x - initialPosition.x === 2 * i){
                    if(desiredPosition.y - initialPosition.y === j){
                        if(rules.tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                            return true;
                        }  
                    }
                }
            }                
        }
    }
    return false;
}

export const getPossibleKnightMoves = (pawn:Pieces, boardState:Pieces[]):Position[]=>{
    let position: Position[] = []
    const rules = new Rules();
    for (let i = -1; i < 2; i+=2) {
        for (let j = -1; j < 2; j+=2) {
                // console.log("Possible Moves : ",pawn.position.x+(i*2),pawn.position.y+j );
                if(rules.isTileOccupied({x:pawn.position.x + (i*2),y:pawn.position.y + j},boardState) || rules.isTileOccupied({x:pawn.position.x + i,y:pawn.position.y + (j*2)},boardState) ){
                    if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x + (i*2),y:pawn.position.y + j},boardState,pawn.team)){
                        position.push({x:pawn.position.x + (i*2),y:pawn.position.y + j})
                    }   
                    if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x + i,y:pawn.position.y + (j*2)},boardState,pawn.team)){
                        position.push({x:pawn.position.x + (i),y:pawn.position.y + (j*2)})
                    }   
                }else{
                    position.push({x:pawn.position.x + (i*2),y:pawn.position.y + j})
                    position.push({x:pawn.position.x + (i),y:pawn.position.y + (j*2)})
                }
        }                
    }
    return position
  }


export default knightRule;