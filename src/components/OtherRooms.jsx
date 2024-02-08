import React from 'react';
import OtherRoomItem from './chatsbar-items/OtherRoomItem';

const OtherRooms = ({rooms=[]}) => {
  return (
    <>
      {rooms.map((room, i) => <OtherRoomItem key={i} room={room} />)}
    </>
  )
};

export default OtherRooms;