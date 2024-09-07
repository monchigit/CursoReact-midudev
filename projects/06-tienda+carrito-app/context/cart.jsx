/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useCartReducer } from "../Hooks/UseCartReducer";

export const CartContext = createContext()

export function CartProvider ({ children }) {
    const {state, addToCart, removeFromCart, removeOneItemFromCart, clearCart} = useCartReducer()

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            removeOneItemFromCart,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}