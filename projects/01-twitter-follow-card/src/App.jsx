
import { users } from './const.js'
import './TwitterFollowCard.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

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