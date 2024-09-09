import { Link } from "../link";

export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>This is a example WebSite to create a React Router from zero</p>
      <Link to={'/about'}>About Us</Link>
    </>
  )
}