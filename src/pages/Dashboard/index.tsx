import { Admin, Resource } from 'react-admin'
import customDataProvider from '../../providers/customDataProvider'

import ProductsList from '../../components/CRUDS/Products/ProductsList'
import ProductCreate from '../../components/CRUDS/Products/ProductCreate'
import DeliveryPointsList from '../../components/CRUDS/DeliveryPoints/DeliveryPointsList'
import authProvider from '../../providers/authProvider'
import Login from '../../pages/Login'

import WithAuth from '../../components/UI/WithAuth'

const Dashboard: React.FC = () => {
  return (
    <Admin
      dataProvider={customDataProvider('http://localhost:3333/api')}
      authProvider={authProvider}
      loginPage={Login}
    >
      <Resource
        name="products"
        list={ProductsList}
        create={ProductCreate}
        options={{ label: 'Produtos' }}
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
