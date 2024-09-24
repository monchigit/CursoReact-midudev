/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { GameContext } from '../context/statusContext.jsx'
import { formatterMins, formatterMsecs, formatterSecs } from "../helper"
import { useRecords } from "../hooks/useRecords.jsx"

export function Records () {
  const { status } = useContext(GameContext)
  const { records, saveRecord } = useRecords({ status })
  useEffect(() => {
    saveRecord()
  } ,[status.time])

  return (
    <div className="records-square">
      <h1 className="records-h1">Records</h1>
      {
        records.map((rec, i) => {
          return (
            <div
            key={i}
            className={`record ${i}`}
            >
              <strong>{
                !rec
                ?
                'Empty' 
                :
                `${formatterMins(rec)}:${formatterSecs(rec)}:${formatterMsecs(rec)}`
              }</strong>
            </div>
          )
        })
      }
    </div>
  )
}