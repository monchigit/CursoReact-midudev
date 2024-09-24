export const gameStatus = {
  initial: 'initial',
  ongoing: 'ongoing',
  paused: 'paused',
  over: 'over',
}

export const gameActions = {
  START : 'START',
  PAUSE : 'PAUSE',
  RESET : 'RESET',
  END : 'END',
  NEWTIME:'NEWTIME',
}

export const initialConditions = {
  state : 'initial',
}

export const board = {
  rows : Array(5).fill().map((x,i) => i + 1),
  columns : Array(5).fill().map((x,i) => i + 1)
}

export const time = {
  firstTime : 3500,
  waitTime : 2000,
  updateTime : 1000,
}

export const gameTargets = {
  regular : 2,
}
