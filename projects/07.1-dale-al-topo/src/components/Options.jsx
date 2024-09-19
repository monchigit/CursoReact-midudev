import { useContext } from "react"
import { GameContext } from "../context/statusContext"

export function Options () {
 const { start, pause, reset } = useContext(GameContext)
  return (
    <section className="options">
      <button onClick={() => start()} className="option-button start">Start</button>
      <button onClick={() => pause()} className="option-button pause">Pause</button>
      <button onClick={() => reset()} className="option-button reset">Reset</button>
    </section>
  )
}