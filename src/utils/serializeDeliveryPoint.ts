import IDeliveryPointsDTO from '../dtos/IDeliveryPointsDTO'
import api from '../services/api'

const serializeDeliveryPoint = async (
  deliveryPointID: string
): Promise<string> => {
  const { data } = await api.get<IDeliveryPointsDTO>(
    `/delivery-points/${deliveryPointID}`
  )

  return (
    data.city +
    ', ' +
    data.state +
    ', ' +
    data.street +
    ', ' +
    data.suburb +
    ', ' +
    data.cep
  )
}

export default serializeDeliveryPoint
