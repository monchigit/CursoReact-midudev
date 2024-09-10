/* eslint-disable react/prop-types */
import { useFollowing } from "../hooks/useFollowing";

export function FollowButton ({ initialIsFollowing }) {
  const { text, buttonClassName, updateFollowing } = useFollowing({ initialIsFollowing })

  return (
    <button className={buttonClassName} onClick={updateFollowing}>
      <span className="tw-followCard-button-follow">{text}</span>
      <span className="tw-followCard-button-stop-follow">Dejar de seguir</span>
    </button>
  )
}