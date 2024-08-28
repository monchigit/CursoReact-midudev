import { Piece } from './piece.jsx';
import { useRef } from "react";
import { useAppContext } from '../../contexts/contexts.js';
import { clearMoves, makeNewMove } from '../../reducer/actions/move.jsx';
import { openPromotion } from '../../reducer/actions/popub.jsx';
import arbiter from '../../arbiter/arbiter.jsx';

import './pieces.css';
import { getCastleDirection } from '../../arbiter/getMove.jsx';
import { detectCheckMate, detectInsufficientMaterial, detectStalemate, updateCastling } from '../../reducer/actions/game.jsx';
import { getNewMoveNotation } from '../../helper.jsx';

export const Pieces = ()=> {
    
    const {appState,dispatch} = useAppContext()

    const currentPosition = appState.position[appState.position.length-1]
    
    const ref = useRef()
    const calculateCoords = e => {
        const {width,left,top} = ref.current.getBoundingClientRect();
        const size = width / 8
        const y = Math.floor((e.clientX - left)/size)
        const x = 7 - Math.floor((e.clientY - top)/size)
        return {x,y};
    }

    const openPromotionBox = ({row,column,x,y})=> {
        dispatch(openPromotion({
            row : Number(row),column : Number(column),x,y
        }))
    }

    const updateCastlingState = ({piece,row,column})=> {
        const direction = getCastleDirection({
            castleDirection : appState.castleDirection,
            piece,row,column
        })
        if (direction) {
            dispatch(updateCastling(direction))
        }
    }

    const move = e => {
        const {x,y} = calculateCoords(e)
        const [piece,row,column] = e.dataTransfer.getData('text').split(',')

        if (appState.allowedMoves?.find(m => m[0] === x && m[1] === y)) {

            const opponent = piece.startsWith('b') ? 'w' : 'b'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'w' : 'b'}`]

            if ((piece === 'wp' && x === 7) || 
            (piece === 'bp' && x === 0)){
                openPromotionBox({row,column,x,y})
                return
            }
            if (piece.endsWith('r') || piece.endsWith('k')) {
                updateCastlingState({piece,row,column})
            }
            const newBoard = arbiter.performMove({
                position : currentPosition,
                piece,row,column,
                x,y
            })

            const newMove = getNewMoveNotation({
                piece,row,column,x,y,position : currentPosition
            })

            dispatch(makeNewMove({newBoard,newMove}))

            if (arbiter.insufficientMaterial(newBoard)){
                dispatch(detectInsufficientMaterial())
            } 
            else if (arbiter.isStalemate(newBoard,opponent,castleDirection)) {
                dispatch(detectStalemate())
            }
            else if (arbiter.isCheckMate(newBoard,opponent,castleDirection)) {
                dispatch(detectCheckMate(piece[0]))
            }
            
        }
        dispatch(clearMoves())
        console.log(appState);
    }

    const onDrop = e => {
        e.preventDefault()
        move(e)
    }

    const onDragOver = e => {
        e.preventDefault()
    }
    
    return (
        <div className='pieces'
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
        >
            {currentPosition.map((r,row)=>
                r.map((c,column)=>
                    currentPosition[row][column]
                    ? <Piece
                    key={row+'-'+column}
                    row={row}
                    column={column}
                    piece={currentPosition[row][column]}
                    />
                    : null
                ))
            }
        </div>
    )
}
