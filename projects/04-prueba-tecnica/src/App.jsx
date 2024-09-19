
import './App.css'
import { useCatImage } from "./Hooks/UseCatImage"
import { useCatFact } from "./Hooks/UseCatFact"
import { Otro } from './Components/Otro'

export function App () {
    const { fact, refreshFact } = useCatFact()
    const { imageURL } = useCatImage({ fact })

    const handleClick = async ()=> {
        refreshFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get New Fact</button>
            {fact && <p>{fact}</p>}
            {imageURL && <img src={imageURL} alt={`Image extracted using the first word for ${fact}`} />}
            <Otro/>
        </main>
    )
}