/* eslint-disable react/prop-types */
import { FollowButton } from './components/followButton.jsx'

export function TwitterFollowCard ({ userName='unkwon', children, initialIsFollowing}) {
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
        <FollowButton initialIsFollowing={initialIsFollowing} />
      </aside>
    </article>
  )
}