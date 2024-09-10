import './App.css'
import { Game } from './components/game.jsx'
import { Turn } from './components/turn.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { useGameState } from './hooks/useGameState.jsx'


function App() {
  const { board, turn, winner, resetGame, updateBoard} = useGameState()
  
  return (
    <main className='board'>
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reset</button>
      <Game board={board} updateBoard={updateBoard} />
      <Turn turn={turn} />
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
