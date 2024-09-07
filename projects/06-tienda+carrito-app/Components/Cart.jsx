/* eslint-disable react/prop-types */
import { useId } from 'react';
import { ClearCartIcon, CartIcon } from './Icons';
import './Cart.css'
import { useCart } from '../Hooks/UseCart';

export function Cart () {
    const cartCheckBoxId = useId()
    const { cart, clearCart, addToCart, removeOneItemFromCart } = useCart()

    function CartItem ({ thumbnail, price, title, quantity, addToCart, removeOneItem}) {
        return (
            <li>
                <img
                src={thumbnail}
                alt={title} />
                <div>
                    <strong>{title}</strong> - ${price}
                </div>

                <footer>
                    <small>
                        Qty: {quantity}
                    </small>
                    <button onClick={addToCart}>+</button>
                    <button onClick={removeOneItem}>-</button>
                </footer>
            </li>
        )
    }

    return (
        <>
            <label className='cart-button' htmlFor={cartCheckBoxId} >
                <CartIcon />
            </label>
            <input type="checkbox" id={cartCheckBoxId} hidden />

            <aside className="cart">
                <ul>
                   {cart.map(product => (
                    <CartItem 
                    key={product.id} 
                    addToCart={()=> addToCart(product)}
                    removeOneItem={()=> removeOneItemFromCart(product)}
                    {...product} 
                    />
                   ))}
                </ul>

                <button onClick={clearCart}>
                    <ClearCartIcon/>
                </button>
            </aside>
        </>

    )
}