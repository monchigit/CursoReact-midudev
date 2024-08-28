import { areSameColorTiles, findPiecesCoord } from "../helper"
import { getBishopMoves, getKingMoves, getKnightMoves, getPawnCaptures, getPawnMoves, getQueenMoves, getRookMoves, getCastlingMoves, getKingPos, getPieces } from "./getMove"
import { movePawn, movePiece } from "./move"

const arbiter = {
    getRegularMoves : function({position,piece,row,column}) {
        if (piece.endsWith('r'))
            return getRookMoves({position,piece,row,column})
        if (piece.endsWith('h'))
            return getKnightMoves({position,row,column})
        if (piece.endsWith('b'))
            return getBishopMoves({position,piece,row,column})
        if (piece.endsWith('q'))
            return getQueenMoves({position,piece,row,column})
        if (piece.endsWith('k'))
            return getKingMoves({position,piece,row,column})
        if (piece.endsWith('p'))
            return getPawnMoves({position,piece,row,column})
    },

    getValidMoves : function({position,castleDirection,previusPosition,piece,row,column}) {
        let moves = this.getRegularMoves({position,previusPosition,piece,row,column})
        let notInCheckMoves = []
        if (piece.endsWith('p')) {
            moves = [
                ...moves,
                ...getPawnCaptures({position,previusPosition,piece,row,column})
            ]
        }
        if (piece.endsWith('k')) {
            moves = [
                ...moves,
                ...getCastlingMoves({position,castleDirection,piece,row,column})
            ]
        }
        moves.forEach(([x,y]) => {
            const positionAfterMove = this.performMove({position,piece,row,column,x,y})

            if (!this.isPlayerInCheck({positionAfterMove,position,player : piece[0]})) {
                notInCheckMoves.push([x,y])
            }
        })
        return notInCheckMoves
    },

    performMove : function({position,piece,row,column,x,y}) {
        if (piece.endsWith('p')) {
            return movePawn({position,piece,row,column,x,y})
        }
        else {
            return movePiece({position,piece,row,column,x,y})
        }
    },

    isPlayerInCheck : function ({positionAfterMove,position,player}) {
        const enemy = player.startsWith('w') ? 'b' : 'w'
        let kingPos = getKingPos(positionAfterMove,player) 
        const enemyPieces = getPieces(positionAfterMove,enemy)

        const enemyMoves = enemyPieces.reduce((acc,p) => acc = [
            ...acc,
            ...(p.piece.endsWith('p'))
            ? getPawnCaptures({
                position : positionAfterMove,
                previusPosition: position,
                ...p
            })
            : this.getRegularMoves({
                position: positionAfterMove,
                ...p
            })
        ],[])
        if (enemyMoves.some(([x,y]) => kingPos[0] === x && kingPos[1] === y)) 
            return true

        return false
    },

    isStalemate : function (position,player,castleDirection) {
        const isInCheck = this.isPlayerInCheck({positionAfterMove:position,player})

        if (isInCheck)
            return false

        const pieces = getPieces(position,player)
        const moves = pieces.reduce((acc,p) => acc = [
            ...acc,
            ...(this.getValidMoves({
                position,
                castleDirection,
                ...p
            }))
        ], [])

        return (!isInCheck && moves.length === 0)
    },

    insufficientMaterial: function(position) {
        const pieces = position.reduce((acc,rank)=> 
            acc = [
                ...acc,
                ...rank.filter(x => x)
            ], [])

        if (pieces.length === 2)
            return true
        
        if (pieces.length === 3 && (pieces.some(p => p.endsWith('b')) || pieces.some(p => p.endsWith('h'))))
            return true

        if (pieces.length === 4 &&
            pieces.every (p => p.endsWith('k') || p.endsWith('b')) &&
            new Set(pieces).size === 4 && 
            areSameColorTiles(
                findPiecesCoord(position,'wb')[0],
                findPiecesCoord(position,'bb')[0]
            ))
            return true

        return false
    },

    isCheckMate: function (position,player,castleDirection) {
        const isInCheck = this.isPlayerInCheck({positionAfterMove:position,player})

        if (!isInCheck)
            return false

        const pieces = getPieces(position,player)
        const moves = pieces.reduce((acc,p) => acc = [
            ...acc,
            ...(this.getValidMoves({
                position,
                castleDirection,
                ...p
            }))
        ], [])

        return (isInCheck && moves.length === 0)
    },
}

export default arbiter