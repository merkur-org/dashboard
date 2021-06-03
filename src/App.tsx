import React from 'react'

import GlobalStyles from './styles/global'
import DashBoard from './pages/Dashboard'

import Providers from './hooks'

function App() {
  return (
    <Providers>
      <GlobalStyles />
      <DashBoard />
    </Providers>
  )
}

export default App
