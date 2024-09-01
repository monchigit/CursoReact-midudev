import { useEffect, useRef, useState } from 'react'
import { Books } from './components/BooksList'
import './App.css'
import { useBooks } from './Hooks/UseBooks'

const useSearch = ()=> {
  const [ search, updateSearch ] = useState('')
  const [ error, setError ] = useState(null)
  const isFirstInput = useRef(true)
  
  useEffect(()=>{
    if (isFirstInput.current && search === '') {
      isFirstInput.current = false
      console.log(isFirstInput);
      return
    }
    if (search.length < 2) {
      setError('La búsqueda debe incluir al menos dos caracteres')
      return
    }
    setError(null)
  },[search])
  return ({ search, updateSearch, error })
}


function App() {
  
  const { search, updateSearch, error } = useSearch()
  const { books, getBooks, loading } = useBooks({ search })
  const isFirstSubmit = useRef(true)
  
  const handleChange = e => {
    const newSearch = e.target.value
    updateSearch(newSearch)
  }

  const handleSubmit = e => {
    e.preventDefault()
    isFirstSubmit.current = false
    getBooks({ search })
  }
  
  return (
    <div className='home' >

      <header>

      </header>



      <section className='home-search' >
        <h1 className='home-search__h1' >Search the title that you want to read!</h1>
        <form onSubmit={handleSubmit} className='home-search__form' >
          <input placeholder='It, Harry Potter, The Hobbit... ' value={search} onChange={handleChange} className='home-search__form-input' />
          <button type='submit' className='home-search__form-button' >Search</button>
        </form>
        {error && <h4 className='home-search__h4' >{error}</h4>}
      </section>

      <main className='home-main' >
        {loading ? <p className='home-main__loading'>Loading...</p> :  <Books books={books} isFirstSubmit={isFirstSubmit.current}/>}
      </main>
    </div>
  )
}

export default App
