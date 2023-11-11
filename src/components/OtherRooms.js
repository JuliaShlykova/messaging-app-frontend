import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const OtherRooms = () => {
  const [rooms, setRooms] = useState([
    {
      _id: '3',
      name: 'Default',
      admin: '1',
      participants: ['1', '2'],
      private: false,
      roomImgUrl: '../assets/images/1.jpg',
      lastMessage: 'hello',
      lastTimestamp: ''
    },
    {
      _id: '4',
      name: 'Default2',
      admin: '1',
      participants: ['1', '2'],
      private: false
    }
  ]);

  return (
    <>
      {rooms.map((room, i) => {
      return (
        <NavLink key={i} to={'/rooms/'+room._id}>{room.name}</NavLink>

      )
    })}
    </>
  )
}

export default OtherRooms