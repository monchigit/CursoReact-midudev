import './App.css'
import { Board } from './components/Boards'
import { Options } from './components/Options'
import { Records } from './components/Records'

function App() {
  return (
    <main className="game">
      <section className="game-board">
        <h1 className="game-h1">Dale al Topo</h1>
        <Board />
        <Options />
      </section>
      <Records />
    </main>
  )
}

export default App
