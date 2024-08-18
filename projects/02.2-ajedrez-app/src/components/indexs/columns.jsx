import { getCharacter } from '../../helper'
import './columns.css'

export const ColumnIndex = ({columns})=> {
    return (
        <div className='rank-index'>
            {columns.map(column => {
                return <span key={column}>{getCharacter(column)}</span>
            })}
        </div>
    )
}