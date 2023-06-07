import { Pieces, Position, samePosition, TeamType } from "@/constants/constants";
import Rules from "./rules";

const bishopRules =(desiredPosition:Position,initialPosition:Position,team:TeamType,boardState:Pieces[]):boolean=>{
    const rules = new Rules();
    if(!samePosition(desiredPosition,initialPosition)){
        for (let i = -1; i < 2; i+=2) {
            for (let j = -1; j < 2; j+=2) {
                if((desiredPosition.x + (i*initialPosition.x)) === -j*(desiredPosition.y + (i*initialPosition.y))  ){
                    if(!rules.checkBishopIllegalMove(desiredPosition,initialPosition,boardState,team)){
                        return true
                    }
                    
                }
                
            }
        }
    }
    return false;
}

export const getPossibleBishopMoves = (pawn:Pieces, boardState:Pieces[]):Position[]=>{
    let position: Position[] = []
    const rules = new Rules();
    let maxX = 7-pawn.position.x;
    let maxY = 7-pawn.position.y;
    let minX = pawn.position.x;
    let minY = pawn.position.y;
    for (let i = 1; i <= maxX; i++) {
        if(rules.isTileOccupied({x:pawn.position.x + i,y:pawn.position.y+i},boardState)) {
            if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x + i,y:pawn.position.y+i},boardState,pawn.team)){
                position.push({x:pawn.position.x + i,y:pawn.position.y+i});
                break;
            }else{break;}   
        }else{
            position.push({x:pawn.position.x + i,y:pawn.position.y+i})
        }
    }
    for (let i = 1; i <= maxY; i++) {
        if(rules.isTileOccupied({x:pawn.position.x - i ,y:pawn.position.y+i},boardState)) {
            if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x - i ,y:pawn.position.y+i},boardState,pawn.team)){
                position.push({x:pawn.position.x - i ,y:pawn.position.y+i});
                break;
            }else{break;}  
        }else{
            position.push({x:pawn.position.x - i ,y:pawn.position.y+i})
        }
    }
    for (let i = 1; i <= minX; i++) {
        if(rules.isTileOccupied({x:pawn.position.x - i,y:pawn.position.y - i},boardState)) {
            if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x - i,y:pawn.position.y - i},boardState,pawn.team)){
                position.push({x:pawn.position.x - i,y:pawn.position.y - i});
                break;
            }   else{break;}  
        }else{
            position.push({x:pawn.position.x - i,y:pawn.position.y - i})
        }
    }
    for (let i = 1; i <= minY; i++) {
        if(rules.isTileOccupied({x:pawn.position.x + i,y:pawn.position.y - i},boardState)) {
            if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x + i,y:pawn.position.y - i},boardState,pawn.team)){
                position.push({x:pawn.position.x + i,y:pawn.position.y - 1});
                break;
            }  else{break;}   
        }else{
            position.push({x:pawn.position.x + i,y:pawn.position.y - i})
        }
    }
    return position
  }


export default bishopRules;