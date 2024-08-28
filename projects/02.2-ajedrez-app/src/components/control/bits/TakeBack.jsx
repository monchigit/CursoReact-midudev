import { useAppContext } from '../../../contexts/contexts.js'
import { takeBack } from '../../../reducer/actions/move.jsx'

const TakeBack = ()=> {

    const {dispatch} = useAppContext()

    return (
        <div className="takeBack">
            <button onClick={()=> dispatch(takeBack())}>Take Back</button>
        </div>
    )
}

export default TakeBack