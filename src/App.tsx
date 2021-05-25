import React from 'react'
import { Admin, Resource } from 'react-admin'
import customDataProvider from './utils/CustomDataProvider'

import ProductsList from './components/ProductsList'
import ProductCreate from './components/ProductCreate'
import DeliveryPointsList from './components/DeliveryPointsList'

function App() {
  return (
    <Admin dataProvider={customDataProvider('http://localhost:3333')}>
      <Resource
        name="products"
        list={ProductsList}
        create={ProductCreate}
        options={{ label: 'Produtos' }}
      />
      <Resource
        name="delivery-points?state=PR"
        list={DeliveryPointsList}
        options={{ label: 'Pontos de entrega' }}
      />
    </Admin>
  )
}

export default App
