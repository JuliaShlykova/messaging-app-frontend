import { clearStorage, setToken, setUser } from '../services/localStorage';
import socket from '../socket';
import api from './authInstance';

export const signout = async() => {
  try {
    console.log('trying log out');
    socket.disconnect();
    await api.post('/auth/logout',{});
    clearStorage();
    window.location.href = '/login';
    return;
  } catch(err) {
    if (err.message === 'Network Error') {
      clearStorage();
      window.location.href = '/server-error';
    }
    console.log(err);
  }
}

export const login = async(data) => {
  try {
    const response = await api.post('/auth/login', data);
    setToken(response.data.token);
    socket.connect();
    let user = {nickname: response.data.nickname, id: response.data.id, profileImgUrl: response.data.profileImgUrl};
    setUser(user);
    socket.emit('login', user);
    return;
  } catch(err) {
    return Promise.reject(err);
  }
}

export const signup = async(data) => {
  try {
    const response = await api.post('/auth/signup', data);
    setToken(response.data.token);
    socket.connect();
    let user = {nickname: response.data.nickname, id: response.data.id}
    setUser(user);
    socket.emit('login', user);
    return;
  } catch(err) {
    return Promise.reject(err);
  }
}