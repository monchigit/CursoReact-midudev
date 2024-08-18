import actionTypes from "./actionTypes"

export const makeNewMove = ({newBoard})=> {
    return {
            type : actionTypes.NEW_MOVE,
            payload: {newBoard}
    }
}

export const generateAllowedMoves = ({allowedMoves})=> {
    return {
            type : actionTypes.GENERATE_ALLOWED_MOVES,
            payload: {allowedMoves}
    }
}

export const clearMoves = ()=> {
    return {
            type : actionTypes.CLEAR_ALLOWED_MOVES
    }
}