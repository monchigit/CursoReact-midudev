import { useState } from "react"

export const useFollowing = ({ initialIsFollowing })=> {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const text = isFollowing 
    ? 'Siguiendo'
    : 'Seguir'
    
    const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

    const updateFollowing = () => {
        setIsFollowing(!isFollowing)
    }
    return { text, buttonClassName, updateFollowing}
  }