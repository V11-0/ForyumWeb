import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5139/api/',
  timeout: 10000
})

export default axiosInstance
