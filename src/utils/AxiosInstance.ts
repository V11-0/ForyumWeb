import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:5000/api/',
    timeout: 10000
})

export default axiosInstance;