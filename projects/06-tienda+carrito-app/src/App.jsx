import { Products } from '../Components/products'
import { products as initialProducts } from '../mocks/products.json'
import { Header } from '../Components/header'
import { Footer } from '../Components/Footer'
import { IS_DEVELOPMENT } from './config'
import { useFilters } from '../Hooks/UseFilters'
import { Cart } from '../Components/Cart'
import { CartProvider } from '../context/cart'

function App() {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)
  
  return (
    <CartProvider>
      <Header />
      <Cart/>
      {filteredProducts.length < 1 
      ? <h3>No results for this search</h3> 
      : <Products products={filteredProducts}/>}
      {IS_DEVELOPMENT && <Footer ></Footer>}
    </CartProvider>
  )
}

export default App
