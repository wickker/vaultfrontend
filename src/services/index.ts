import axios from 'axios'
import Config from '@/configs'

export const vaultApi = axios.create({
  baseURL: `${Config.VITE_BE_BASE_URL}/protected`,
  headers: {
    'Content-Type': 'application/json',
  },
})
