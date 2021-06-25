import theme from '../styles/theme'
import { AuthProvider } from './auth'
import { ThemeProvider } from 'styled-components'

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}

export default Providers
