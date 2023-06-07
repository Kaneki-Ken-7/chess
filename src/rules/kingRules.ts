import { Pieces, Position, samePosition, TeamType } from "@/constants/constants";
import Rules from "./rules";

const kingRules =(desiredPosition:Position,initialPosition:Position,team:TeamType,boardState:Pieces[]):boolean=>{
    const rules = new Rules();
    if(!samePosition(desiredPosition,initialPosition)){
        let validMove = false;
        if(!rules.checkKingIllegalMove(initialPosition,desiredPosition,boardState,team)){
            validMove = true;
        }
        return validMove;
    }
    return false;
}

export const getPossibleKingMoves = (pawn:Pieces, boardState:Pieces[]):Position[]=>{
    let position: Position[] = []
    const rules = new Rules();
    for (let i = -1; i < 2; i+=2) {
        for (let j = -1; j < 2; j+=2) {
            if(rules.isTileOccupied({x:pawn.position.x + i,y:pawn.position.y + j},boardState) ){
                if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x + i,y:pawn.position.y + j},boardState,pawn.team)){
                        position.push({x:pawn.position.x + i,y:pawn.position.y + j})
                    }      
                }else{
                    position.push({x:pawn.position.x + i,y:pawn.position.y + j})
                }
                if(rules.isTileOccupied({x:pawn.position.x + i,y:pawn.position.y },boardState)){
                    if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x + i,y:pawn.position.y },boardState,pawn.team)){
                        position.push({x:pawn.position.x + i,y:pawn.position.y })
                    }    
                }else{
                    position.push({x:pawn.position.x + i,y:pawn.position.y })
                }
                if(rules.isTileOccupied({x:pawn.position.x,y:pawn.position.y + j },boardState)){
                    if(rules.tileIsEmptyOrOccupiedByOpponent({x:pawn.position.x,y:pawn.position.y + j },boardState,pawn.team)){
                        position.push({x:pawn.position.x,y:pawn.position.y + j })
                    }    
                }else{
                    position.push({x:pawn.position.x,y:pawn.position.y + j})
                }
        }                
    }
    return position
  }

export default kingRules;