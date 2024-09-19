import { useState } from "react";
import { useContext } from 'react';
import { GameContext } from '../context/statusContext.jsx';
import { gameStatus } from "../constants";
import { getRandomInt } from "../helper";

export function useTarget () {
  const { status } = useContext(GameContext)
  const [targetPos, setTargetPos] = useState(undefined)
  const [targetSquare, setTargetSquare] = useState(undefined)

  const updateTarget = (matched = false) => {
    if (matched === false && status.state === gameStatus.ongoing) {
      const newTargetPos = `${getRandomInt(1,5)}-${getRandomInt(1,5)}`
      const newTargetSquare = document.getElementsByClassName(newTargetPos)[0]
      setTargetPos(newTargetPos)
      setTargetSquare(newTargetSquare)
      return
    } else {
      const newTargetPos = undefined
      const newTargetSquare = undefined
      setTargetPos(newTargetPos)
      setTargetSquare(newTargetSquare)
      return
    }
  }

  return { targetPos, targetSquare, updateTarget}
}