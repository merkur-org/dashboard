import React from 'react'

import GlobalStyles from './styles/global'
import DashBoard from './pages/Dashboard'

import Providers from './hooks'
import { createContext } from 'react'

function App() {
  return (
    <Providers>
      <DashBoard />
    </Providers>
  )
}

export default App
