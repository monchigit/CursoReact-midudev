import actionTypes from "./actionTypes"

export const makeNewMove = ({newBoard,newMove})=> {
    return {
            type : actionTypes.NEW_MOVE,
            payload: {newBoard,newMove}
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

export const takeBack = ()=> {
    return {
            type : actionTypes.TAKE_BACK
    }
}

export const reset = ()=> {
    return {
            type : actionTypes.RESET
    }
}