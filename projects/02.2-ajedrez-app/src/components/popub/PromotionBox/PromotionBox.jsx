
import { useAppContext } from '../../../contexts/contexts'
import { copyBoard } from '../../../helper'
import { clearMoves, makeNewMove } from '../../../reducer/actions/move'
import './PromotionBox.css'

// eslint-disable-next-line react/prop-types
const PromotionBox = ({ onClosePopup }) => {

    const options = ['q','b','h','r']
    
    const {appState,dispatch} = useAppContext()
    const {promotionSquare} = appState

    if (!promotionSquare) 
        return null

    const color = promotionSquare.x === 7 ? 'w' : 'b'

    const getPromotionBox = ()=> {
        const style = {}

        if (promotionSquare.x === 7)
            style.top = '-12.5%'
        else
            style.top = '95%'

        if (promotionSquare.y <= 1) 
            style.left = '0%'
        else if (promotionSquare.y >= 6)
            style.left = '80%'
        else 
            style.left = `${12.5 * promotionSquare.y - 20}`
    return style
    }

    const onClick = option => {
        onClosePopup()
        const newBoard = copyBoard(appState.position[appState.position.length -1])
        newBoard[promotionSquare.row][promotionSquare.column] = ''
        newBoard[promotionSquare.x][promotionSquare.y] = color+option
        dispatch(makeNewMove({newBoard}))
        dispatch(clearMoves())
    }

    return (
    <div className='popup-inner promotion-choices' style={getPromotionBox()}>
        {
        options.map(option => 
            <div 
                key={option} 
                className={`piece ${color}${option}`}
                onClick={()=>onClick(option)}
                />)
        }
    </div>
    )
}



export default PromotionBox