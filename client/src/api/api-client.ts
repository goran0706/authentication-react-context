import axios, { CanceledError } from 'axios'

const BASE_URL = 'http://localhost:3000'
const token = localStorage.getItem('token') || ''

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer ' + token
  }
})

export { CanceledError }
