/* eslint-disable react/prop-types */
import { createContext } from 'react';
import { useStatusReducer } from '../hooks/UseStatusReducer';

export const GameContext = createContext()

export function GameProvider ({ children }) {
  const { status, start, pause, reset, over, endTime } = useStatusReducer() 
  return (
    <GameContext.Provider value={{
      status: status,
      start,
      pause,
      reset,
      over,
      endTime,
    }} >
      {children}
    </GameContext.Provider>
  )
}