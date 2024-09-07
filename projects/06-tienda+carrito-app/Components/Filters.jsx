import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../Hooks/UseFilters'

export function Filters () {
    const { filters, setFilters } = useFilters()

    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangePrice = e => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }))
    }

    const handleChangeCategory = e => {
        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        })) 
    }

    return (
        <section className="filters">

            <div>
                <label htmlFor={minPriceFilterId} >Mininum Price</label>
                <input type='range' 
                id='price'
                min='0'
                max='2000'
                onChange={handleChangePrice}
                value={filters.minPrice} />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId} >Category</label>
                <select id="category" onChange={handleChangeCategory}>
                    <option value="all">All</option>
                    <option value="beauty">Beauty</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="furniture">Furniture</option>
                    <option value="smartphones">Smartphones</option>
                </select>
            </div>

        </section>
    )
}