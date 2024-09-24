import { useContext } from "react"
import { GameContext } from "../context/statusContext"
import { formatterMins, formatterMsecs, formatterSecs } from "../helper"
import './WinnerModal.css'

export function WinnerModal () {
  const { status, reset } = useContext(GameContext)
  return (
    <section className="winner">
      <div className="winner-square">
        <h2 className="winner-h2">Congratulations, You Win!</h2>
        <h3 className="winner-h3">Final Time : {`${formatterMins(status.time)}:${formatterSecs(status.time)}:${formatterMsecs(status.time)}`} </h3>
        <button className="winner-button" onClick={reset} >Start New Game</button>
      </div>
    </section>
  )
}