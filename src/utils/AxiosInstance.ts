import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5139/api/',
  timeout: 10000
})

// TODO Logoff in case of 401 response

export default axiosInstance
