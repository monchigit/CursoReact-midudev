import { Status } from "../constant"
import actionTypes from "./actions/actionTypes"

export const reducer = (state,action) => {
    switch (action.type) {
        case actionTypes.NEW_MOVE: { 
            let {turn,position} = state
            
            position = [
                ...position,
                action.payload.newBoard
            ]

            turn = turn === 'w' ? 'b' : 'w'
            
            return {
                ...state,
                turn,
                position 
                }
            }

            case actionTypes.GENERATE_ALLOWED_MOVES: {
                return {
                    ...state,
                    allowedMoves: action.payload.allowedMoves
                }
            }

            case actionTypes.CLEAR_ALLOWED_MOVES: {
                return {
                    ...state,
                    allowedMoves: []
                }
            }
        

            case actionTypes.PROMOTION_OPEN: {
                return {
                    ...state,
                    status : Status.promoting,
                    promotionSquare : {...action.payload}
                }
            }
        

            case actionTypes.PROMOTION_CLOSE: {
                return {
                    ...state,
                    status : Status.ongoing,
                    promotionSquare : null
                }
            }
        

            case actionTypes.CAN_CASTLE: {
                let {turn,castleDirection} = state
                castleDirection[turn] = action.payload
                return {
                    ...state,
                    castleDirection
                }
            }
                
            case actionTypes.STALEMATE: {
                return {
                    ...state,
                    status : Status.stalemate
                }
            }
        
                
            case actionTypes.NEW_GAME: {
                return {
                    ...action.payload
                }
            }
        
            default:
            return state
    }
}