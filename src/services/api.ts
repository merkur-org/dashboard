import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API || 'http://165.227.214.134/api'
})

export default api
