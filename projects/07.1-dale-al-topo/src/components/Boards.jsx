import { useContext } from "react";
import "./Board.css"
import { GameContext } from "../context/statusContext";
import { Timer } from "./Timer";
import { Squares } from "./Squares";

export function Board () {
  const { status, over } = useContext(GameContext)
  return (
    <div className="board">
      <h1>{status.state}</h1>
      <Squares status={status} over={over} />
      <Timer status={status} />
    </div>
  )
}
