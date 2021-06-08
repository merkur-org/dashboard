import theme from '../styles/theme'
import { ThemeProvider } from 'styled-components'

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Providers
