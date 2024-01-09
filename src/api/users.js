import api from './privateRouteInstance';

export const getUsers = async() => {
  const response = await api.get('/users/');
  return response.data.users;
}