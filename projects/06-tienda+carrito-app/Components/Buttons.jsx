/* eslint-disable react/prop-types */
import { useCart } from "../Hooks/UseCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";

export function AddDeleteButtons ({ product }) {
    const { addToCart, cart, removeFromCart } = useCart()

    const checkProductInCart = product =>  {
        return cart.some(item => item.id === product.id)
    }

    function AddButton () {
        return (
            <button onClick={()=> addToCart(product)} 
            style={{background:'#09f4',outline:'none'}}>
                <AddToCartIcon />
            </button>
        )
    }

    function RemoveButton () {
        return (
            <button 
                onClick={()=> removeFromCart(product)} 
                style={{background:'#f124'}}>
                    <RemoveFromCartIcon />
            </button>
        )
    }

    const isProductInCart = checkProductInCart(product)

    return (
        <div className="in-cart-buttons">
            { isProductInCart && <RemoveButton /> }
            <AddButton />
        </div>
    )

}