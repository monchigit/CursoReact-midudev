/* eslint-disable react/prop-types */
import { BUTTON, EVENTS } from "./const"

const navigate = (href)=> {
    window.history.pushState({}, '', href)
    // crear un evento personalizado
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
  }

  export function Link ({ target, to, ...props }) {
    const handleClick = e => {
        const isMainEvent = e.button === BUTTON.primary // primary click
        const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            e.preventDefault()
            navigate(to) // navegacion con SPA
            window.scrollTo(0,0)
        }

    }

    return <a onClick={handleClick} href={to} target={target} {...props}></a>
  }
  