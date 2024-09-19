import { useContext } from "react"
import { GameContext } from "../context/statusContext"

export function WinnerModal () {
  const { status, winner } = useContext(GameContext)
  return (
    <section className="winner-modal">
      <h2>Felicidades Has Ganado</h2>
      <h3>Tu Tiempo es </h3>
    </section>
  )
}