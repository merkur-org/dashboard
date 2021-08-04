import { useState, useEffect } from 'react'
import { TextFieldProps, useRecordContext } from 'react-admin'

import serializeDeliveryPoint from '../../../utils/serializeDeliveryPoint'

import { Cointainer } from './styles'

const DeliveryPointField: React.FC<TextFieldProps> = props => {
  const record = useRecordContext(props)
  const [deliveryPoint, setDeliveryPoint] = useState('')

  useEffect(() => {
    async function setSerializedDeliveryPoint() {
      const point = await serializeDeliveryPoint(record.delivery_point_id)
      setDeliveryPoint(point)
    }

    setSerializedDeliveryPoint()
  }, [record])

  return (
    <Cointainer>
      <h3>{props.label}</h3>
      <p>{deliveryPoint}</p>
    </Cointainer>
  )
}

export default DeliveryPointField
