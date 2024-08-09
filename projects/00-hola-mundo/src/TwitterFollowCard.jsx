/* eslint-disable react/prop-types */
import { useState } from "react"

export function TwitterFollowCard ({ userName='unkwon', children, initialIsFollowing=false }) {

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const text = isFollowing 
    ? 'Siguiendo' 
    : 'Seguir'
    
    const buttonClassName = isFollowing 
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }
    
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img 
                className='tw-followCard-avatar'
                src={`https://unavatar.io/${userName}`}
                alt="avatar de barbudo" />
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-button-follow">{text}</span>
                    <span className="tw-followCard-button-stop-follow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}