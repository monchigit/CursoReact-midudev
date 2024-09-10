//* eslint-disable react-refresh/only-export-components *//

import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { UsersProvider } from './contexts/userContext.jsx'

const root= ReactDOM.createRoot(document.getElementById('root'))


root.render(
  <UsersProvider>
    <App/>
  </UsersProvider>
)