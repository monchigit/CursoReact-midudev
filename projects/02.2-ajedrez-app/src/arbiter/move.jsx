import { copyBoard } from '../helper'

export const movePiece = ({position,piece,row,column,x,y})=> {
    const newBoard = copyBoard(position)

    if (piece.endsWith('k') && Math.abs(y - column) > 1) {
        if (y === 2) {
            newBoard[row][0] = ''
            newBoard[row][3] = piece.startsWith('w') ? 'wr' : 'br'
        }
        if (y === 6) {
            newBoard[row][7] = ''
            newBoard[row][5] = piece.startsWith('w') ? 'wr' : 'br'
        }
    }

    newBoard[row][column] = ''
    newBoard[x][y] = piece

    return newBoard
}

export const movePawn = ({position,piece,row,column,x,y})=> {
    const newBoard = copyBoard(position)
    if (!newBoard[x][y] && x !== row && y !== column) {
        newBoard[row][y] = ''
    }

    newBoard[row][column] = ''
    newBoard[x][y] = piece

    return newBoard
}