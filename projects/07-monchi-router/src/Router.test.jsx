import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Router } from './router'
import { Route } from './route'
import { Link } from './link'
import { getCurrentPath } from './utils'

vi.mock('./utils.js', ()=> ({
  getCurrentPath: vi.fn()
}))

describe('Router', ()=> {
  beforeEach(()=> {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render without problems', ()=> {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })
  
  it('should render 404 if no routes match', ()=> {
    render(<Router routes={[]} defaultComponent={()=> <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeDefined()
  })

  it ('should render the first component from the first rute that matches', ()=> {
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      {
        path: '/',
        component: ()=> <h1>Home</h1>
      },
      {
        path: '/about',
        component: ()=> <h1>About</h1>
      },
    ]
    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should navigate using links', async ()=> {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Router>
        <Route path='/' component={()=> {return (
          <>
            <h1>Home</h1>
            <Link path={'/about'}>About Us</Link>
          </>
        )}} />
        <Route path={'/about'} component={()=> <h1>About</h1>} />
      </Router>
    )
    // click on the link
    const button = screen.getByText(/About Us/)
    fireEvent.click(button)

    const aboutTitle = await screen.findByText('About')
    // check that the new route is rendered
    expect(aboutTitle).toBeTruthy()
  })
})
