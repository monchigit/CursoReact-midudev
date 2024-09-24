import { useContext } from "react";
import "./Board.css"
import { GameContext } from "../context/statusContext";
import { Timer } from "./Timer";
import { Squares } from "./Squares";
import { gameStatus } from "../constants";
import { WinnerModal } from "./WinnerModal";

export function Board () {
  const { status, over, endTime } = useContext(GameContext)
  return (
    <div className="board">
      <Squares status={status} over={over} />
      <Timer status={status} endTime={endTime}/>
      { status.state === gameStatus.over ? <WinnerModal /> : null }
    </div>
  )
}
