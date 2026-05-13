import axios from 'axios'
import { getApiBaseUrl } from './apiBase'

const API = axios.create({
  baseURL: `${getApiBaseUrl()}/api`,
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
    console.log('🔐 Token sent with request:', req.url)
  } else {
    console.warn('⚠️ No token found in localStorage for request:', req.url)
  }

  return req
})

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.error('❌ 401 Unauthorized - Token may be invalid or expired')
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(err)
  }
)

export default API
