import { Board } from './components/board/Board'
import './App.css'
import AppContext from './contexts/contexts'
import { useEffect, useReducer } from 'react'
import { reducer } from './reducer/reducer'
import { initGameState } from './constant'
import Control from './components/control/control'
import MovesList from './components/control/bits/MovesList'
import TakeBack from './components/control/bits/TakeBack'
import Reset from './components/control/bits/Reset'

function App() {
  const [appState, dispatch] = useReducer(reducer,initGameState)
  const providerState = {
    appState,
    dispatch
  }

  const pos = appState.position

    useEffect(()=> {
      console.log(pos);
      // window.localStorage.setItem('board',)
      
    },[pos])

  return (
    <AppContext.Provider value={providerState}>
      <section className='App'>
        <Board/>
        <Control>
          <MovesList/>
          <TakeBack/>
          <Reset/>
        </Control>
      </section>
    </AppContext.Provider>
  )
}

export default App
