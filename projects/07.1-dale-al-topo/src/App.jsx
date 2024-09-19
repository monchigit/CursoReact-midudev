import './App.css'
import { Board } from './components/Boards'
import { Options } from './components/Options'
import { Records } from './components/Records'

function App() {
  return (
    <>
      <h1>Dale al Topo</h1>
      <Board />
      <Options />
      <Records />
    </>
  )
}

export default App
