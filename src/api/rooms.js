import api from './privateRouteInstance';

export const getRooms = async() => {

  api.get('/rooms/getListRooms')
}