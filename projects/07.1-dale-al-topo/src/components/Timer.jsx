/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect } from "react"
import { gameStatus } from "../constants"
import { useTimers } from "../hooks/useTimer"
import { formatterMins, formatterMsecs, formatterSecs } from "../helper"

export function Timer ({ status, endTime }) {
  const { sec, clock, setTimeClock, updateClock, stopClock, clearClock } = useTimers()

  const setClock = () => {
    setTimeClock(()=>{
      updateClock()
    }, 100)
  }

  useEffect(()=>{
    if (status.state === gameStatus.ongoing && clock.current.length === 0 ) {
      setClock()
      return () => {
        if (status.state === gameStatus.initial) clearClock()
        if (status.state === gameStatus.paused) stopClock()
      }
    }
    if (status.state === gameStatus.initial) {
      clearClock()
    }
    if (status.state === gameStatus.paused) {
      stopClock()
    }
    if (status.state === gameStatus.over) {
      endTime(sec)
      stopClock()
    }
  }, [status.state])
  
  return (
    <>
      {
        status.state === gameStatus.ongoing || status.state === gameStatus.paused
        ? 
        <h2 className="board-timer__h2">Current Time : {`${formatterMins(sec)}:${formatterSecs(sec)}:${formatterMsecs(sec)}`}</h2>
        : 
        <h2 className="board-timer__h2">Current Time : {"00:00:00"}</h2>
      }
    </>
  )
}
