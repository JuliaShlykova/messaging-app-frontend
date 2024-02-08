import { clearStorage, setToken, setUser } from '../services/localStorage';
import socket from '../socket';
import api from './authInstance';

export const signout = async() => {
  try {
    socket.disconnect();
    await api.post('/auth/logout', {});
    clearStorage();
    window.location.href = '/login';
    return;
  } catch(err) {
    console.log(err);
  }
};

export const login = async(data) => {
  try {
    const response = await api.post('/auth/login', data);
    setToken(response.data.token);
    let user = {nickname: response.data.nickname, id: response.data.id, profileImgUrl: response.data.profileImgUrl};
    setUser(user);
    return;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const signup = async(data) => {
  try {
    const response = await api.post('/auth/signup', data);
    setToken(response.data.token);
    let user = {nickname: response.data.nickname, id: response.data.id}
    setUser(user);
    return;
  } catch(err) {
    return Promise.reject(err);
  }
};