import { gameActions, gameStatus, initialConditions } from "../constants";

export const initialStatus = initialConditions

export const statusReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  
  if (actionType === gameActions.START && actionPayload !== state.state) {
    console.log('change 1');
    
    state = gameStatus.ongoing
    return  {
      state
    }
  }
  if (actionType === gameActions.PAUSE && actionPayload === state.state) {
    console.log('change 2');
    
    state = gameStatus.paused
    return  {
      state
    }
  }
  if (actionType === gameActions.RESET && actionPayload !== state.state) {
    console.log('change 3');
    
    let { state } = initialStatus
    return {
      state
    }
  }
  if (actionType === gameActions.END && actionPayload !== state.state) {
    console.log('change 4');
    
    state = gameStatus.initial
    return {
      state
    }
  }
  else return state
}