import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

let axiosInstance = axios.create({})

axiosInstance.interceptors.request.use(config => {
  let token = localStorage.getItem('jwt')
  token && (config.headers.authorization = `${token}`)
  return config
}, err => {
  return Promise.reject(err)
})

axiosInstance.interceptors.response.use(res => {
  if (res.data.code === 401) {
    Message.error(res.data.message)
    localStorage.clear('jwt')
    router.replace({
      path: '/login'
    })
  }
  return res
}, err => {
  return Promise.reject(err)
})

export default axiosInstance
