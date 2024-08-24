import { useEffect, useState } from "react"

const CAT_PREFFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({ fact }) {
    const [imageURL, setImageURL] = useState()

    useEffect(()=> {
        if (!fact) return 
        const firstWords = fact.split(' ',3).join(' ')
        fetch(`https://cataas.com/cat/says/${firstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response
                setImageURL(url)
            })
    }, [fact])
    return { imageURL : `${CAT_PREFFIX_IMAGE_URL}${imageURL}` }
}