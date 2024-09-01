import { useRef, useState, useCallback } from 'react'
import { searchBooks } from '../service/Books'

export function useBooks ({ search }) {
    const [ books, setBooks ] = useState([])
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const previousSearch = useRef(search)

    const getBooks = useCallback(
        async({ search })=> {
            if (search === '') return
            if (previousSearch.current === search) return
            try {
                setLoading(true)
                previousSearch.current = search
                const newBooks = await searchBooks({ search })
                setBooks(newBooks)
            } catch (e) {
                setError(e.message)
                console.log();
                
            } finally {
                setLoading(false)
            }
        },[])
    
    return ({ books, getBooks, loading })
}