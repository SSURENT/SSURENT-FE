import axios from 'axios';

const api = axios.create({
  // NOTE: baseURL 나중에 수정
  baseURL: 'http://ssurent.com/v1',
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
