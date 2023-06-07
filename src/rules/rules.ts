import { Pieces, TeamType, PieceType, Position, samePosition } from "@/constants/constants"
import pawnRule from "./pawnRules";
import knightRule, { getPossibleKnightMoves } from "./knightRules";
import rookRule, { getPossibleRookMoves } from "./rookRules";
import queenRule, { getPossibleQueenMoves } from "./queenRules";
import bishopRule, { getPossibleBishopMoves } from "./bishopRules";
import kingRule, { getPossibleKingMoves } from "./kingRules";
import { getPossiblePawnMoves } from "./pawnRules";

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
        switch (type) {
            case PieceType.PAWN:
                return pawnRule(desiredPosition,initialPosition, team,boardState);
                break;
            case PieceType.KNIGHT:
                return knightRule(desiredPosition,initialPosition, team,boardState);
                break;
            case PieceType.ROOK:
                return rookRule(desiredPosition,initialPosition, team,boardState);
                break;
            case PieceType.BISHOP:
                return bishopRule(desiredPosition,initialPosition, team,boardState);
                break;
            case PieceType.QUEEN:
                return queenRule(desiredPosition,initialPosition, team,boardState);
                break;
            case PieceType.KING:
                return kingRule(desiredPosition,initialPosition, team,boardState);
                break;
        
            default: return false;
                break;
        }
        return false;
    }
    getValidMoves(piece:Pieces,boardState:Pieces[]):Position[]{
        let position: Position[]= []
        switch (piece.type) {
            case PieceType.PAWN:
                position = getPossiblePawnMoves(piece,boardState)
                break;
            case PieceType.KNIGHT:
                position = getPossibleKnightMoves(piece,boardState)
                break;
            case PieceType.ROOK:
                position = getPossibleRookMoves(piece,boardState)
                break;
            case PieceType.BISHOP:
                position = getPossibleBishopMoves(piece,boardState);
                break;
            case PieceType.QUEEN:
                position = getPossibleQueenMoves(piece,boardState)
                break;
            case PieceType.KING:
                position = getPossibleKingMoves(piece,boardState)
                break;
            default: return [];
                break;
        }
        return position
    }
}