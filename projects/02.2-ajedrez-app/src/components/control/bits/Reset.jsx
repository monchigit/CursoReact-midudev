import { useAppContext } from '../../../contexts/contexts.js'
import { reset } from '../../../reducer/actions/move.jsx'

const Reset = ()=> {

    const {dispatch} = useAppContext()

    return (
        <div className="Reset">
            <button onClick={()=> dispatch(reset())}>Reset</button>
        </div>
    )
}

export default Reset