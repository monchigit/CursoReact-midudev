import { initGameState, Status } from "../constant"
import actionTypes from "./actions/actionTypes"

export const reducer = (state,action) => {
    switch (action.type) {
        case actionTypes.NEW_MOVE: { 
            let {turn,movesList,position} = state
            
            position = [
                ...position,
                action.payload.newBoard
            ]
            
            movesList = [
                ...movesList,
                action.payload.newMove
            ]

            turn = turn === 'w' ? 'b' : 'w'
            
            return {
                ...state,
                movesList,
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
                
            case actionTypes.INSUFFICIENT_MATERIAL: {
                return {
                    ...state,
                    status : Status.insufficient
                }
            }
                
            case actionTypes.WIN: {
                return {
                    ...state,
                    status : action.payload === 'w' 
                    ? Status.white 
                    : Status.black
                }
            }
                
            case actionTypes.NEW_GAME: {
                return {
                    ...action.payload
                }
            }

            case actionTypes.TAKE_BACK: {

                let {position,movesList,turn} = state

                if (position.length > 1) {
                    position = position.slice(0,position.length-1)
                    movesList = movesList.slice(0,movesList.length-1)
                    turn = turn === 'w' ? 'b' : 'w'
                }

                return {
                    ...state,
                    position,
                    movesList,
                    turn
                }
            }
        

            case actionTypes.RESET: {

                state = initGameState

                return {
                    ...state,
                }
            }
        
            default:
            return state
    }
}