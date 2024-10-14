import './App.css'
import { Movies } from '../components/movie'
import { useMovies } from '../hooks/useMovies'
import { useEffect, useState, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=>{
    if (isFirstInput.current && search === '') {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('Debe ingresar un texto para la búsqueda')
      return
    }
    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  },[search])

  return ({ search, updateSearch, error })
}

export function App () {
  const [ sort, setSort ] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(debounce(search => {
    getMovies({ search })
    }, 300)
  ,[])

  const handleSubmit = e => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = e => {
    const newSearch = e.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  } 

  const handleSort = ()=> {
    setSort(!sort)
  }


    return(
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'/>
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <h3>Cargando...</h3> : <Movies movies={movies}/>
        }
      </main>
    </div>
  )
}
