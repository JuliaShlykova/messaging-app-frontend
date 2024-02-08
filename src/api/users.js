import api from './privateRouteInstance';
import apiImg from './privateRouteImageInstance';

export const getUsers = async() => {
  const response = await api.get('/users/');
  return response.data.users;
};

export const getUserRooms = async(nickname) => {
  const response  = await api.get('/users/'+nickname+'/getInfo');
  return response.data;
};

export const updateName = async(newName) => {
  try {
    await api.post('/users/update-nickname', {nickname: newName});
    return;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const updateProfileImg = async(userImg) => {
  try {
    const response = await apiImg.post('/users/upload-profile-img', {userImg});
    return response.data.profileImgUrl;
  } catch(err) {
    return Promise.reject(err);
  }
};