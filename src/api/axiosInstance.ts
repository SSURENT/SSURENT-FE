import axios from 'axios';

const api = axios.create({
  // NOTE: 엔드포인트 나중에 수정
  baseURL: 'http://ssurent.com/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
