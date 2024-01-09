import api from './privateRouteInstance';

export const getRooms = async() => {
  const response = await api.get('/rooms/');
  return response.data.rooms;
}

export const getOtherRooms = async() => {
  const response = await api.get('/rooms/other');
  return response.data.rooms;
}

export const getRoom = async(roomId) => {
  const response = await api.get('/rooms/'+roomId);
  return response.data;
}

export const createRoom = async(data) => {
  const response = await api.post('/rooms/create', data);
  return response.data.roomInfo;
}