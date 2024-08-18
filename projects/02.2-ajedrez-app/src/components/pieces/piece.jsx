/* eslint-disable react/prop-types */
import arbiter from "../../arbiter/arbiter"
import { useAppContext } from "../../contexts/contexts"
import { generateAllowedMoves } from "../../reducer/actions/move"

export const Piece = ({ row,column,piece })=> {

    const {appState,dispatch} = useAppContext()
    const {turn,castleDirection,position : currentPosition} = appState


    const onDragStart = e => {
        e.dataTransfer.efectAllowed = 'move'
        e.dataTransfer.setData('text/plain',`${piece},${row},${column}`)
        setTimeout(() => {
            e.target.style.display='none'
        }, 0);

        if (turn === piece[0]) {
            const allowedMoves = arbiter.getValidMoves({position:currentPosition[currentPosition.length-1],
                previusPosition:currentPosition[currentPosition.length-2],
                castleDirection:castleDirection[turn],
                piece,
                row,
                column})
                dispatch(generateAllowedMoves({allowedMoves}))
        }
    }

    const onDragEnd = e => e.target.style.display = 'block'

    return (
        <div
        className={`piece ${piece} p-${row}${column}`} 
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        />
    )
}