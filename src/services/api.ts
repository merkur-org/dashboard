import axios from 'axios'

const api = axios.create({
  baseURL: "http://137.184.28.204/api"
})

export default api
