
import { Status } from '../../../constant'
import { useAppContext } from '../../../contexts/contexts'
import { setUpNewGame } from '../../../reducer/actions/game'
// import { copyBoard } from '../../../helper'
// import { clearMoves, makeNewMove } from '../../../reducer/actions/move'
import './GameEnds.css'

const GameEnds = () => {

    const {appState: {status}, dispatch} = useAppContext()
    

    if (status === Status.ongoing || status === Status.promoting) 
        return null

    const isWin = status.endsWith('wins')

    const newGame = ()=> {
        dispatch(setUpNewGame())
    }
    
    return (
    <div className='popup-inner popup-inner__center'>
        <h1>{isWin ? status : 'Draw'}</h1>
        <p>{!isWin && status}</p>
        <div className={status}></div>
        <button onClick={newGame}>NEW GAME</button>
    </div>
    )
}


export default GameEnds