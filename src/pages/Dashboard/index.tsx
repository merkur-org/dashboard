import { Admin, Resource } from 'react-admin'

import { FaShoppingBag, FaClipboardList, FaMapMarkerAlt } from 'react-icons/fa'
import { createMuiTheme } from '@material-ui/core'

import Theme from '../../styles/theme'

import customDataProvider from '../../providers/customDataProvider'

import ProductsList from '../../components/CRUDS/Products/ProductsList'
import ProductsShow from '../../components/CRUDS/Products/ProductsShow'
import ProductCreate from '../../components/CRUDS/Products/ProductCreate'
import ProductEdit from '../../components/CRUDS/Products/ProductEdit'

import OrdersList from '../../components/CRUDS/Orders/OrdersList'
import OrdersShow from '../../components/CRUDS/Orders/OrdersShow'

import DeliveryPointsList from '../../components/CRUDS/DeliveryPoints/DeliveryPointsList'

import authProvider from '../../providers/authProvider'
import LoginPage from '../../pages/Login'

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

const Dashboard: React.FC = () => {
  return (
    <Admin
      dataProvider={customDataProvider(
        process.env.REACT_APP_API || 'http://localhost:3333/api'
      )}
      authProvider={authProvider}
      loginPage={LoginPage}
      theme={dashBoardTheme}
      title="Merkur Admin"
    >
      <Resource
        name="products"
        list={ProductsList}
        create={ProductCreate}
        edit={ProductEdit}
        show={ProductsShow}
        icon={FaShoppingBag}
        options={{ label: 'Produtos' }}
      />
      <Resource
        name="orders"
        list={OrdersList}
        show={OrdersShow}
        icon={FaClipboardList}
        options={{ label: 'Pedidos' }}
      />
      <Resource
        name="delivery-points"
        list={DeliveryPointsList}
        icon={FaMapMarkerAlt}
        options={{ label: 'Pontos de entrega' }}
      />
    </Admin>
  )
}

export default Dashboard
