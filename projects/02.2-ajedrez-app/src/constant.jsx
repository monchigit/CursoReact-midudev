import { createBoard } from "./helper";

export const  Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'white' : 'White wins', 
    'black' : 'Black wins',
    'stalemate' : 'Game draws due to Stalemate',
    'insufficient' : 'Game draws due to insufficient materials'
} 

export const initGameState = {
    position: [createBoard()],
    turn: 'w',
    allowedMoves : [],
    status: Status.ongoing,
    promotionSquare : null,
    castleDirection : {
        'w' : 'both',
        'b' : 'both',
    }
}