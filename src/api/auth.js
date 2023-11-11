import api from './authInstance';

export const signout = async() => {
  const response = await api.get('/auth/logout');
  return response;
}