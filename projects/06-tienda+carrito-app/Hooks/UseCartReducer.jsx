import { useReducer } from "react"
import { CART_ACTION_TYPES, cartInitialState, cartReducer } from "../src/reducer/reducer"

export const useCartReducer = ()=> {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)
    
    const addToCart = product => dispatch({
        type: CART_ACTION_TYPES.ADD_TO_CART,
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: CART_ACTION_TYPES.REMOVE_FROM_CART,
        payload: product
    })

    const removeOneItemFromCart = product => dispatch({
        type: CART_ACTION_TYPES.REMOVE_ONE_ITEM_FROM_CART,
        payload: product
    })

    const clearCart = () => dispatch({
        type: CART_ACTION_TYPES.CLEAR_CART
    })

    return { state, addToCart, removeFromCart, removeOneItemFromCart, clearCart}
}