import api from './privateRouteInstance';
import apiImg from './privateRouteImageInstance';

export const getRooms = async() => {
  const response = await api.get('/rooms/');
  return response.data.rooms;
};

export const getOtherRooms = async() => {
  const response = await api.get('/rooms/other');
  return response.data.rooms;
};

export const getRoom = async(roomId) => {
  const response = await api.get('/rooms/'+roomId);
  return response.data;
};

export const createRoom = async(data) => {
  const response = await api.post('/rooms/create', data);
  return response.data.roomInfo;
};

export const privateRoom = async(data) => {
  const response = await api.post('/rooms/private', data);
  return response.data;
};

export const sendMessage = async(roomId, msg) => {
  try {
    const response = await api.post('/rooms/'+roomId+'/create-message', {text: msg});
    return response.data;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const renameRoom = async(roomId, newName) => {
  try {
    const response = await api.post('/rooms/'+roomId+'/update-name', {name: newName});
    return response.data.updRoom;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const uploadRoomImg = async(roomId, roomImg) => {
  try {
    const formData = new FormData();
    formData.append('roomImg', roomImg);
    const response = await apiImg.post('/rooms/'+roomId+'/set-image', formData);
    return response.data.roomImgUrl;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const getUsersToInvite = async(roomId) => {
  try {
    const response = await api.get('/rooms/'+roomId+'/users-to-invite');
    return response.data.users;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const inviteUsers = async(roomId, data) => {
  try {
    const response = await api.post('/rooms/'+roomId+'/invite', data);
    return response.data.newParticipants;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const apiLeaveRoom = async(roomId) => {
  await api.post('/rooms/'+roomId+'/leave');
  return;
};

export const apiJoinRoom = async(roomId) => {
  await api.post('/rooms/'+roomId+'/join');
  return;
};

export const apiDeleteRoom = async(roomId) => {
  await api.post('/rooms/'+roomId+'/delete');
  return;
};