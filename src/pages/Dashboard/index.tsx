import { Admin, Resource } from 'react-admin'

import ptBrMessages from 'ra-language-pt-br'
import polyglotI18nProvider from 'ra-i18n-polyglot'

import {
  FaShoppingBag,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTruck,
  FaClipboard
} from 'react-icons/fa'

import dashBoardTheme from '../../styles/dashBoardTheme'

import customDataProvider from '../../providers/customDataProvider'

import ProductsList from '../../components/CRUDS/Products/ProductsList'
import ProductsShow from '../../components/CRUDS/Products/ProductsShow'
import ProductCreate from '../../components/CRUDS/Products/ProductCreate'
import ProductEdit from '../../components/CRUDS/Products/ProductEdit'

import OrdersList from '../../components/CRUDS/Orders/OrdersList'

import DeliveryPointsList from '../../components/CRUDS/DeliveryPoints/DeliveryPointsList'
import DeliveryPointCreate from '../../components/CRUDS/DeliveryPoints/DeliveryPointCreate'
import DeliveryPointEdit from '../../components/CRUDS/DeliveryPoints/DeliveryPointEdit'
import DeliveryPointShow from '../../components/CRUDS/DeliveryPoints/DeliveryPointShow'

import ListsList from '../../components/CRUDS/Lists/ListstList'
import ListCreate from '../../components/CRUDS/Lists/ListCreate'

import authProvider from '../../providers/authProvider'
import LoginPage from '../../pages/Login'

const Dashboard: React.FC = () => {
  const messages = {
    'pt-br': ptBrMessages
  }

  const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br')

  return (
    <Admin
      dataProvider={customDataProvider('http://localhost:3333/api')}
      authProvider={authProvider}
      loginPage={LoginPage}
      i18nProvider={i18nProvider}
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
        icon={FaClipboardList}
        options={{ label: 'Pedidos' }}
      />
      <Resource
        name="delivery-points"
        list={DeliveryPointsList}
        create={DeliveryPointCreate}
        edit={DeliveryPointEdit}
        show={DeliveryPointShow}
        icon={FaMapMarkerAlt}
        options={{ label: 'Pontos de entrega' }}
      />
      <Resource
        name="lists"
        list={ListsList}
        create={ListCreate}
        icon={FaCalendarAlt}
        options={{ label: 'Ofertas semanais' }}
      />
      <Resource
        name="providers"
        icon={FaTruck}
        options={{ label: 'Oferta semanal' }}
      />
      <Resource
        name="providers"
        icon={FaClipboard}
        options={{ label: 'Oferta semanal' }}
      />
    </Admin>
  )
}

export default Dashboard
