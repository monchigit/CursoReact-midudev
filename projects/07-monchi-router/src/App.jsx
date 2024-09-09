import './App.css'
import { lazy, Suspense } from 'react'
import { Router } from './router.jsx' // import estático
import { Route } from './route.jsx'

// import dinámico
const About = lazy(()=> import('./pages/about.jsx'))
const HomePage = lazy(()=> import('./pages/home.jsx'))
const SearchPage = lazy(()=> import('./pages/search.jsx'))
const page404 = lazy(()=> import('./pages/404.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    component: About
  },
  {
    path: '/search/:query',
    component: SearchPage
  },
]

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={page404}>
          <Route path='/' component={HomePage} />
          <Route path='/about' component={About} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
