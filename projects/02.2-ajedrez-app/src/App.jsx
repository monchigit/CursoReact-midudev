import { Board } from './components/board/Board'
import './App.css'
import AppContext from './contexts/contexts'
import { useReducer } from 'react'
import { reducer } from './reducer/reducer'
import { initGameState } from './constant'

function App() {
  const [appState, dispatch] = useReducer(reducer,initGameState)
  const providerState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={providerState}>
      <section className='App'>
        <Board/>
      </section>
    </AppContext.Provider>
  )
}

export default App
