import Cookies from 'js-cookie'
import api from '../services/api'

const handleAddImage = async data => {
  const token = Cookies.get('token')
  const formData = new FormData()
  const image = data.image.rawFile
  const id = data.data.id

  try {
    formData.append('image', image)

    await api.patch(`/products/image/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data'
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export default handleAddImage
