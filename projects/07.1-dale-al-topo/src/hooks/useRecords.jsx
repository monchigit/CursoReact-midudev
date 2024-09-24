import { useState } from "react"

export function useRecords ({ status }) {
  const [records, setRecords] = useState(()=> {
    const recordsFromStorage =  window.localStorage.getItem('records')
    if (recordsFromStorage) return JSON.parse(recordsFromStorage)
    return Array(10).fill(null)
  })

  const orderRecords = (array) => {
    array.sort((a,b) => {
      if (!a) return 1
      if (!b) return -1
      return a - b
    })
    const newArray = array.slice(0,10)
    return newArray
  }

  const saveRecord = () => {
    if (!status.time) return
    const newRecords = [...records]
    newRecords.push(status.time)
    const orderedRecords = orderRecords(newRecords)
    window.localStorage.setItem('records', JSON.stringify(orderedRecords))
    setRecords(orderedRecords)
  }

  return { records, saveRecord }
}