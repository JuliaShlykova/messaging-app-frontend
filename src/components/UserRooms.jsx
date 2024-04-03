import React from 'react';
import UserRoomItem from './chatsbar-items/UserRoomItem';

const UserRooms = ({rooms=[]}) => {
  return (
    <>
      {rooms.map((room, i) => 
        <UserRoomItem
          key={i}
          roomId={room._id}
          roomImgUrl={room.roomImgUrl}
          name={room.name}
          createdAt={room.createdAt}
          lastMessage={room.lastMessage}
        />)}
    </>
  )
};

export default UserRooms;