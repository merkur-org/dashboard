import { Admin, Resource } from 'react-admin'

import ptBrMessages from 'ra-language-pt-br'
import polyglotI18nProvider from 'ra-i18n-polyglot'

import customDataProvider from '../../providers/customDataProvider'

import ProductsList from '../../components/CRUDS/Products/ProductsList'
import ProductCreate from '../../components/CRUDS/Products/ProductCreate'
import ProductEdit from '../../components/CRUDS/Products/ProductEdit'

import OrdersList from '../../components/CRUDS/Orders/OrdersList'

import DeliveryPointsList from '../../components/CRUDS/DeliveryPoints/DeliveryPointsList'

import authProvider from '../../providers/authProvider'
import Login from '../../pages/Login'

const Dashboard: React.FC = () => {
  const messages = {
    'pt-br': ptBrMessages
  }

  const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br')

  return (
    <Admin
      dataProvider={customDataProvider('http://localhost:3333/api')}
      authProvider={authProvider}
      loginPage={Login}
      i18nProvider={i18nProvider}
    >
      <Resource
        name="products"
        list={ProductsList}
        create={ProductCreate}
        options={{ label: 'Produtos' }}
        edit={ProductEdit}
      />
      <Resource
        name="orders"
        list={OrdersList}
        options={{ label: 'Pedidos' }}
      />
      <Resource
        name="delivery-points"
        list={DeliveryPointsList}
        options={{ label: 'Pontos de entrega' }}
      />
    </Admin>
  )
}

export default Dashboard
