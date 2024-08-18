import actionTypes from "./actionTypes"

export const openPromotion = ({row,column,x,y})=> {
    return {
        type : actionTypes.PROMOTION_OPEN,
        payload : {row,column,x,y}
    }
}

export const closePopup = ()=> {
    return {
        type : actionTypes.PROMOTION_CLOSE
    }
}