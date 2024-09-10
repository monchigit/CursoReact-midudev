import { useState } from "react"
import { initialConditions, TURNS } from "../constants"
import { checkEndGame, checkWinner } from '../logic/board'

export const useGameState = ()=> {
    const [board,setBoard] = useState(()=>{
      const boardFromStorage = window.localStorage.getItem('board')
      if  (boardFromStorage) return JSON.parse(boardFromStorage)
      return initialConditions.board
    })
  
    const [turn,setTurn] = useState(()=>{
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ?? initialConditions.turn
    }
    )
  
    const [winner,setWinner] = useState(null) 
    // null no hay ganador, false hay un empate, true hay ganador
    
  
    const resetGame = ()=> {
      setBoard(initialConditions.board)
      setTurn(initialConditions.turn)
      setWinner(null)
  
      window.localStorage.removeItem('board')
      window.localStorage.removeItem('turn')
    }
  
  
    const updateBoard = (index)=> {
      //no actualizamos esta posicion si ya tiene algo
      if (board[index] || winner) return
      //actualizar el tablero
      const newBoard = [...board]
      newBoard[index] = turn // X, O
      setBoard(newBoard)
      //cambiar el turno
      const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)
      //revisar si hay un ganador
      const newWinner = checkWinner(newBoard)
      if (newWinner) {
        // confetti()
        setWinner(newWinner)
      } else if(checkEndGame(newBoard)) {
        setWinner(false)
      }
      //Guardar partida
      window.localStorage.setItem('board',JSON.stringify(newBoard))
      window.localStorage.setItem('turn',newTurn)
    }
    return { board, turn, winner, resetGame, updateBoard}
  }
