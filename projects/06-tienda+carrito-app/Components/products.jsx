/* eslint-disable react/prop-types */
import './products.css'
import { AddDeleteButtons } from './Buttons'

export function Products({ products }) {
    return (
        <main className='products'>
            <ul>
                {products.slice(0,24).map(product => {
                    return (
                        <li key={product.id} >
                            <img src={product.thumbnail} alt={product.title} />
                            <div>
                                <strong>{product.title}</strong> - ${product.price}
                            </div>
                            <AddDeleteButtons product={product} />
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}