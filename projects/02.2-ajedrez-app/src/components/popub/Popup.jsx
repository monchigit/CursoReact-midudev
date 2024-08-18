import './Popup.css'
import { useAppContext } from '../../contexts/contexts.js'
import { Status } from '../../constant.jsx'
import { closePopup } from '../../reducer/actions/popub.jsx'
import React from 'react'

// eslint-disable-next-line react/prop-types
const Popup = ({children})=> {

    const {appState,dispatch} = useAppContext()

    if (appState.status === Status.ongoing) 
        return null

    const onClosePopup = ()=> {
        dispatch(closePopup())
    }

    return (
        <div className='popup'>
            {
            React.Children
            .toArray(children)
            .map(child => React.cloneElement(child, {onClosePopup}))
            }
        </div>
    )
}

export default Popup