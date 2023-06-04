import { Pieces, TeamType, PieceType } from "@/constants/constants"

export default class Rules {
    isTileOccupied(x:number,y:number,boardState:Pieces[]) : boolean{
        
        const piece = boardState.find(p=> p.position.x === x && p.position.y ===y)
        if(piece){
            return true
        }else{
            return false
        }
    }

    TileIsOccupiedByOpponent(x:number, y:number, boardState:Pieces[], team:TeamType) : boolean{
        const piece = boardState.find(p=> p.position.x === x && p.position.y === y && p.team !== team)
        if(piece){
            return true
        }else{
            return false
        }
    }

    isEnpassantMove(px:number, py:number,x:number,y:number,type:PieceType, team:TeamType,boardState:Pieces[]):boolean{

        const pawnDirection = team === TeamType.WHITE ? 1 : -1;
        if(type === PieceType.PAWN){
            if((x - px === -1 || x - px === 1) && y - py === pawnDirection){
                const piece = boardState.find(p => p.position.x === x && p.position.y === y - pawnDirection && p.enPassant === true);
                console.log("piece enpassant :",piece);
                if(piece){
                    return true
                }else{
                    return false
                }
            }
        }

        // if(piece){
        //     return true
        // }

        return false;
    }

    isValid(px:number, py:number,x:number,y:number,type:PieceType, team:TeamType,boardState:Pieces[]){
        // console.log("Rules Check Move ");
        // console.log(`Args : Prev (x:${px},y:${py}) Cur(x:${x},y:${y}) ${type} ${team}`);

        if(type === PieceType.PAWN){
            const specialRow = team === TeamType.WHITE ? 1 : 6;
            const pawnDirection = team === TeamType.WHITE ? 1 : -1;
            
            //PAWN Movement Logic
            if(py === specialRow && px==x &&y - py === 2*pawnDirection){
                if(!this.isTileOccupied(x,y,boardState) && !this.isTileOccupied(x,y-pawnDirection,boardState)){
                    return true;
                }
            }else if (px === x && y - py === pawnDirection) {
                    if(!this.isTileOccupied(x,y,boardState)){
                        return true;
                    }     
            }
            //PAWN Attacking Logic
            else if(x - px === -1 && y - py === pawnDirection){
                if(this.TileIsOccupiedByOpponent(x,y,boardState,team)){
                    // console.log("strike ");
                    return true
                }
            }
            else if(x - px === 1 && y - py === pawnDirection){
                if(this.TileIsOccupiedByOpponent(x,y,boardState,team)){
                    // console.log("strike ");
                    return true
                }
            }
        }
        return false;
    }
}