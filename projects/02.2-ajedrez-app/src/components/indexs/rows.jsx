import './rows.css'

export const RowIndex = ({rows}) => {
    return (
    <aside className='tile-index'>
        {rows.map(row=>{
            return <span key={row}>{row}</span>
        })}
    </aside>
    )
}
