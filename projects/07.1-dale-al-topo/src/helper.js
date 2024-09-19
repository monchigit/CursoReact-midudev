export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const value = Math.floor(Math.floor(Math.random() * (max - min + 1) + min))
  return value
}

export const isTarget = (position, target) => {
  const isSquareTarget = target === position ? true : false
  return isSquareTarget
}

export const formatterMins = (sec) => {
  let mins = Math.floor(sec/600)
  mins = mins.toString().padStart(2, '0')
  return mins
}

export const formatterSecs = (sec) => {
  let secs = Math.floor((sec % 600)/10)
  secs = secs.toString().padStart(2, '0')
  return secs
}

export const formatterMsecs = (sec) => {
  let msecs = sec % 10
  msecs = msecs.toString().padStart(1)
  return msecs
}
