import axios from 'axios';
import { getToken, setToken, removeToken, removeUser } from '../services/localStorage';

const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    return Promise.reject(new Error('no token'));
  }
  return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
    return response;
  }, async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      removeToken();

      try {
        const rs = await instance.post('/auth/refresh');
        setToken(rs.data.token);
        return instance(originalConfig);
      } catch(_error) {
        removeUser();
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;