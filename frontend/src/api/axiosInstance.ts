import axios from 'axios';

// axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  // TODO
  config.headers['X-User-Id'] = '2';
  return config;
})

export default axiosInstance;
