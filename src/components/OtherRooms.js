import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';

const defaultRooms = [
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
];

const OtherRooms = ({rooms=defaultRooms, setRooms}) => {

  return (
    <>
      {rooms.map((room, i) => {
      return (
        <NavLink key={i} to={'/rooms/' + room._id}>
        <div className="avatar-container">
          {room.roomImgUrl
          ?<img src={room.roomImgUrl} alt='' />
          :<Avatar name={room.name} />}
        </div>
          <span>{room.name}</span>
        </NavLink>

      )
    })}
    </>
  )
}

export default OtherRooms