import axios from 'axios';
import { getToken, setToken, removeToken, removeUser, clearStorage } from '../services/localStorage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const instanceWithoutAccessToken = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
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
    console.log('error in request: ', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
    return response;
  }, async (err) => {
    const originalConfig = err.config;
    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      removeToken();

      try {
        const rs = await instanceWithoutAccessToken.post('/auth/refresh', {});
        setToken(rs.data.token);
        return instance(originalConfig);
      } catch(_error) {
        clearStorage();
        window.location.href = '/login';
        return Promise.reject(_error);
      }
    }
    if (err.message === 'Network Error') {
      clearStorage();
      window.location.href = '/server-error';
      
    } else {
      return Promise.reject(err);
    }
  }
);

export default instance;