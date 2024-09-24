import { useReducer } from "react"
import { gameActions, gameStatus } from "../constants"
import { initialStatus, statusReducer } from "../reducer/StatusReducer"

export function useStatusReducer () {
  const [status, dispatch] = useReducer(statusReducer, initialStatus)
  
  const start = () => {
    dispatch({
      type : gameActions.START,
      payload : gameStatus.ongoing
    })
  }
  
  const pause = () => {
    dispatch({
      type : gameActions.PAUSE,
      payload : gameStatus.ongoing
    })
  }
  
  const reset = () => {
    dispatch({
      type : gameActions.RESET,
      payload : gameStatus.initial
    })
  }
  
  const over = () => {
    dispatch({
      type : gameActions.END,
      payload : gameStatus.ongoing
    })
  }
  
  const endTime = (sec) => {
    dispatch({
      type : gameActions.NEWTIME,
      payload : {
        state : gameStatus.over,
        time : sec
      }
    })
  }
  
  return { status, start, pause, reset, over, endTime }
}