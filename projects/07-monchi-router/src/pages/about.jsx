/* eslint-disable react/prop-types */
import { Link } from "../link";

const i18n = {
  es : {
    title: 'Sobre Nosotros',
    button: 'Volver a Home',
    desciption: 'Hola soy moises y estoy creando un clon de react router'
  },
  en : {
    title: 'About Us',
    button: 'Go Home',
    desciption: 'Hello my name is Moises and im creating a clone from React Router'
  },
}

const useI18n = lang => {
  return i18n[lang] || i18n.en
}

export default function About ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src="https://scontent.fvln1-1.fna.fbcdn.net/v/t39.30808-1/257373604_1570369476665956_8575377957114910835_n.jpg?stp=dst-jpg_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=mBs9TPwl4X0Q7kNvgHi-FXM&_nc_ht=scontent.fvln1-1.fna&oh=00_AYAqqcwzFeQzuhu7gtuaFjHEXL1ztp0bFw_TGGxSUVi1rQ&oe=66E2B5C5" alt="moises sanchez" />
        <p>{i18n.desciption}</p>
      </div>
      <Link to={'/'}>{i18n.button}</Link>
    </>
  )
}