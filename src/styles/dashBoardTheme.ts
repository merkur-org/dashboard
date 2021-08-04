import { createMuiTheme } from '@material-ui/core'

import Theme from './theme'

const dashBoardTheme = createMuiTheme({
  palette: {
    primary: {
      main: Theme.colors.darkOrange
    },
    secondary: {
      main: Theme.colors.orangePrimary
    },
    text: {
      primary: Theme.colors.black,
      disabled: Theme.colors.lightGray
    },
    background: {
      default: '#f7f7f7'
    }
  }
})

export default dashBoardTheme
