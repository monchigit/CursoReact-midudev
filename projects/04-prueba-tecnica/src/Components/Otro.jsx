import { useCatImage } from "../Hooks/UseCatImage"

export function Otro() {
    const { imageURL } = useCatImage({ fact:'cat' })
    return (
        <>
            {imageURL && <img src={imageURL} />}
        </>
    )
}