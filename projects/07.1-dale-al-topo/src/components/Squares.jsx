/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from 'react'
import { board, gameStatus, gameTargets } from '../constants'
import { isTarget } from '../helper'
import { useTarget } from '../hooks/UseTarget'
import { useTimers } from '../hooks/useTimer'

export function Squares ({ status, over }) {
  
  const { targetPos, targetSquare , updateTarget } = useTarget()
  const { setTimer, clearAllTimers } = useTimers()
  const date = useRef(0)
  const remaining = useRef(2000)
  const gameMatch = useRef(0)
  const isFirstTarget = useRef(true)

  const newMatchMove = () => {
    remaining.current = 2000
    date.current = Date.now()
    gameMatch.current += 1
    updateTarget(true)
    setTimer(() => { updateTarget() } , remaining.current);
  }

  const newGameOver = () => {
    updateTarget(true)
    clearAllTimers()
    over()
  }

  const ongoingMove = (statement) => {
    date.current = Date.now()
    if (statement) {
      remaining.current = 3000
      isFirstTarget.current = false
      setTimer(() => { updateTarget() }, remaining.current);
      return () => clearAllTimers()
    } else {
      setTimer(() => { updateTarget() } , remaining.current);
    }
  }

  const initMove = () => {
    date.current = 0
    remaining.current = 2000
    isFirstTarget.current = true
    gameMatch.current = 0
    updateTarget()
    clearAllTimers()
  }

  const pauseMove = (statement) => {
    updateTarget()
    clearAllTimers()
    if (statement === undefined) {
      remaining.current = remaining.current - Date.now() + date.current
    } else {
      remaining.current = 0
    }
  }



  useEffect(()=>{
    if (status.state === gameStatus.ongoing) {
      ongoingMove(isFirstTarget.current)
    } if (status.state === gameStatus.initial) {
      initMove()
    } if (status.state === gameStatus.paused) {
      pauseMove(targetPos)
    } 
  }, [status.state])
  
  const handleClick = e => {
    if (e.target === targetSquare && gameMatch.current < gameTargets.regular) {
      console.log('match');
      newMatchMove()
    }
    if (status.state === gameStatus.ongoing && gameMatch.current >= gameTargets.regular) {
      console.log('game over');
      newGameOver()
    }
    if (e.target !== targetSquare) {
      console.log("don't match");
    }
  }

  return (
    <div className='board-squares'>{
      board.rows.map((row, i) =>
        board.columns.map((column, j) => {
          const pos = `${i + 1}-${j + 1}`
          const posClass = `board-square ${i + 1}-${j + 1}`
          return (
            <div 
            key={row+'-'+column}
            className={ isTarget(pos, targetPos) ? `${posClass} target` : `${posClass}` }
            onClick={ handleClick }
            />
          )
        }
        )
      )
    }</div>
  )
}