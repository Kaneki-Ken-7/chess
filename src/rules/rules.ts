import { Pieces, TeamType, PieceType, Position, samePosition } from "@/constants/constants"

export default class Rules {

    tileIsEmptyOrOccupiedByOpponent(position:Position, boardState:Pieces[], team:TeamType) : boolean{
        return !this.isTileOccupied(position,boardState) || this.tileIsOccupiedByOpponent(position,boardState,team)
    }
    checkRookIllegalMove(desiredPosition:Position,initialPosition:Position,boardState:Pieces[],team:TeamType){
        let xSign = (desiredPosition.x - initialPosition.x) === 0 ? 0 :(desiredPosition.x - initialPosition.x) > 0? 1: -1;
        let ySign = (desiredPosition.y - initialPosition.y) === 0 ? 0 :(desiredPosition.y - initialPosition.y) > 0? 1: -1;
        let illegal = false;
        for (let i = 1; i < Math.max(Math.abs(desiredPosition.x - initialPosition.x),Math.abs(desiredPosition.y - initialPosition.y)) + 1; i++) {
            let passedPosition: Position = {x:initialPosition.x + xSign*i, y:initialPosition.y + ySign*i}
            if(samePosition(passedPosition,desiredPosition)){
                if(this.isTileOccupied(passedPosition,boardState)){
                    illegal = true
                }
                if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition,boardState,team)){
                    illegal = false
                }
            }else {
                if(this.isTileOccupied(passedPosition,boardState)){
                    return true
                }
                
            }
        }
        return illegal;
    }
    checkBishopIllegalMove(desiredPosition:Position,initialPosition:Position,boardState:Pieces[],team:TeamType){
        let xSign = (desiredPosition.x - initialPosition.x) > 0 ? 1 : -1;
        let ySign = (desiredPosition.y - initialPosition.y) > 0 ? 1 : -1;
        let illegal = false;
        for (let i = 1; i < Math.max(Math.abs(desiredPosition.x - initialPosition.x),Math.abs(desiredPosition.y - initialPosition.y)) +1 ; i++) {
            let passedPosition: Position = {x:initialPosition.x + xSign*i, y:initialPosition.y + ySign*i}
            if(samePosition(passedPosition,desiredPosition)){
                if(this.isTileOccupied(passedPosition,boardState)){
                    illegal = true
                }
                if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition,boardState,team)){
                    illegal = false
                }
            }else {
                if(this.isTileOccupied(passedPosition,boardState)){
                    return true
                }
                
            }
        }
        return illegal
    }
    isTileOccupied(position:Position,boardState:Pieces[]) : boolean{
        const piece = boardState.find(p=> samePosition(p.position,position))
        if(piece){
            return true
        }else{
            return false
        }
    }

    tileIsOccupiedByOpponent(position:Position, boardState:Pieces[], team:TeamType) : boolean{
        const piece = boardState.find(p=> samePosition(p.position,position) && p.team !== team)
        if(piece){
            return true
        }else{
            return false
        }
    }

    isEnpassantMove(initialPosition:Position,desiredPosition:Position,type:PieceType, team:TeamType,boardState:Pieces[]):boolean{

        const pawnDirection = team === TeamType.WHITE ? 1 : -1;
        if(type === PieceType.PAWN){
            if((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection){
                const piece = boardState.find(p => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant === true);
                console.log("piece enpassant :",piece);
                if(piece){
                    return true
                }else{
                    return false
                }
            }
        }
        return false;
    }
    checkKingIllegalMove(initialPosition:Position, desiredPosition:Position, boardState:Pieces[], team:TeamType) : boolean{
        let xSign = 0
        let ySign = 0
        let illegal = false
            if(desiredPosition.x < initialPosition.x){
                xSign = -1
            }else if(desiredPosition.x > initialPosition.x ){
                xSign = 1
            }
            if(desiredPosition.y < initialPosition.y){
                ySign = -1
            }else if(desiredPosition.y > initialPosition.y ){
                ySign = 1
            }
            console.log("sign",xSign,ySign);
            
            let passedPosition:Position = {x:initialPosition.x + xSign,y:initialPosition.y+ySign}
            if(samePosition(passedPosition,desiredPosition)){
                if(this.isTileOccupied(passedPosition,boardState)){
                    illegal = true
                }
                if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition,boardState,team)){
                    illegal = false
                }
            }else {
                if(this.isTileOccupied(passedPosition,boardState)){
                    illegal = true
                }
                
            }
        return illegal;
    }
    isValid(initialPosition:Position,desiredPosition:Position,type:PieceType, team:TeamType,boardState:Pieces[]){
        // console.clear()
        if(type === PieceType.PAWN){
            if(!samePosition(desiredPosition,initialPosition)){
                const specialRow = team === TeamType.WHITE ? 1 : 6;
                const pawnDirection = team === TeamType.WHITE ? 1 : -1;
                
                //PAWN Movement Logic
                if(initialPosition.y === specialRow && initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === 2*pawnDirection){
                    if(!this.isTileOccupied(desiredPosition,boardState) && !this.isTileOccupied({x:desiredPosition.x,y:desiredPosition.y-pawnDirection},boardState)){
                        return true;
                    }
                }else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
                        if(!this.isTileOccupied(desiredPosition,boardState)){
                            return true;
                        }     
                }
                //PAWN Attacking Logic
                else if(desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection){
                    if(this.tileIsOccupiedByOpponent(desiredPosition,boardState,team)){
                        return true
                    }
                }
                else if(desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection){
                    if(this.tileIsOccupiedByOpponent(desiredPosition,boardState,team)){
                        return true
                    }
                }
            }
        }else if(type === PieceType.KNIGHT){
            if(!samePosition(desiredPosition,initialPosition)){
                for (let i = -1; i < 2; i+=2) {
                    for (let j = -1; j < 2; j+=2) {
                        if(desiredPosition.y - initialPosition.y === 2 * i){
                            if(desiredPosition.x - initialPosition.x === j){
                                if(this.tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                                    return true;
                                }   
                            }
                        }
                        if(desiredPosition.x - initialPosition.x === 2 * i){
                            if(desiredPosition.y - initialPosition.y === j){
                                if(this.tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
                                    return true;
                                }  
                            }
                        }
                    }                
                }
            }
        }
        else if(type === PieceType.ROOK){
            if(!samePosition(desiredPosition,initialPosition)){
                if((desiredPosition.x === initialPosition.x && desiredPosition.y !== initialPosition.y )||(desiredPosition.y === initialPosition.y && desiredPosition.x !== initialPosition.x )){
                    if(!this.checkRookIllegalMove(desiredPosition,initialPosition,boardState,team)){
                        return true
                    }
                }
               
            }
        }
        else if(type === PieceType.BISHOP){
            if(!samePosition(desiredPosition,initialPosition)){
                for (let i = -1; i < 2; i+=2) {
                    for (let j = -1; j < 2; j+=2) {
                        if((desiredPosition.x + (i*initialPosition.x)) === -j*(desiredPosition.y + (i*initialPosition.y))  ){
                            if(!this.checkBishopIllegalMove(desiredPosition,initialPosition,boardState,team)){
                                return true
                            }
                            
                        }
                        
                    }
                }
            }
        }
        else if(type === PieceType.QUEEN){
            if(!samePosition(desiredPosition,initialPosition)){
                let validMove = false;
                for (let i = -1; i < 2; i+=2) {
                    for (let j = -1; j < 2; j+=2) {
                        if((desiredPosition.x + (i*initialPosition.x)) === -j*(desiredPosition.y + (i*initialPosition.y))  ){
                            if(!this.checkBishopIllegalMove(desiredPosition,initialPosition,boardState,team)){
                                validMove = true
                            }
                            
                        }
                        
                    }
                }
                if((desiredPosition.x === initialPosition.x && desiredPosition.y !== initialPosition.y )|| (desiredPosition.y === initialPosition.y && desiredPosition.x !== initialPosition.x )){
                    if(!this.checkRookIllegalMove(desiredPosition,initialPosition,boardState,team)){
                        validMove = true
                    }
                }
                return validMove
            }
        }else if(type === PieceType.KING){
            if(!samePosition(desiredPosition,initialPosition)){
                let validMove = false;
                if(!this.checkKingIllegalMove(initialPosition,desiredPosition,boardState,team)){
                    validMove = true;
                }
                return validMove;
            }
        }


        return false;
    }
}