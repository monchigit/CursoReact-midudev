import './Board.css'
import { RowIndex } from '../indexs/rows.jsx'
import { ColumnIndex } from '../indexs/columns.jsx'
import {Pieces} from '../pieces/pieces.jsx'
import { useAppContext } from '../../contexts/contexts.js'
import Popup from '../popub/Popup.jsx'
import arbiter from '../../arbiter/arbiter.jsx'
import { getKingPos } from '../../arbiter/getMove.jsx'
import PromotionBox from '../popub/PromotionBox/PromotionBox.jsx'
import GameEnds from '../popub/GameEnds/GameEnds.jsx'


export function Board() {
    const rows = Array(8).fill().map((x,i) => 8-i)
    const columns = Array(8).fill().map((x,i) => i + 1)

    const {appState} = useAppContext()
    const position = appState.position[appState.position.length-1]

    const isChecked = (()=> {
        const isInCheck = arbiter.isPlayerInCheck({
            positionAfterMove: position,
            player: appState.turn
        })
        if (isInCheck) {
            return getKingPos(position,appState.turn)
        }
        return null
    })()

    const getClassName = (i,j)=> {
        let c = 'tile'
        c+= (i+j) % 2 === 0 ? ' tile-dark' : ' tile-light'

        if (appState.allowedMoves?.find(m => m[0] === i && m[1] === j)) {
            if (position[i][j])
                    c += ' attacking'
            else c += ' highligth'
        }

        if (isChecked && isChecked[0] === i && isChecked[1] === j)
            c += ' checked' 

        return c
    }

    return (
        <div className="board">
            <RowIndex rows={rows}></RowIndex>
            <div className="tiles">
                {rows.map((row,i)=>
                    columns.map(((column,j)=>
                        <div key={row+'-'+column} className={getClassName(7-i,j)}></div>
            )))}
            </div>
            <Pieces/>
            <Popup>
                <PromotionBox/>
                <GameEnds/>
            </Popup>
            <ColumnIndex columns={columns}></ColumnIndex>
        </div>
    )
}
