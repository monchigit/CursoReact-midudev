

import './TwitterFollowCard.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
    {
        userName: 'midudev', 
        name : 'Miguel Ángel Durán',
        isFollowing: true
    },
    {
        userName: 'pheralb', 
        name : 'Pablo H.',
        isFollowing: false
    },
    {
        userName: 'PacoHdez', 
        name : 'Paco Hernández',
        isFollowing: true
    },
    {
        userName: 'TMChein', 
        name : 'Thomas',
        isFollowing: false
    }
]

export function App () {
    
    return (
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => {
                    return (
                        <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    )
}