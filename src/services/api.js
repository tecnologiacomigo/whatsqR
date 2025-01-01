import axios from 'axios'

const api = axios.create({
  baseURL: 'https://whatsapp.clube.ai',
  headers: {
    apikey: '781FBAADA524CC6D776131ABCBF8D'
  }
})

export const fetchQRCode = (phone) => api.get(`/instance/connect/${phone}`);

export default api;
