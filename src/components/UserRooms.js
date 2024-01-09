import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';

const defaultRooms = [
  {
    _id: '1',
    name: 'Default',
    admin: '1',
    participants: ['1', '2'],
    private: false,
    roomImgUrl: '../assets/images/1.jpg',
    lastMessage: 'hello',
    lastTimestamp: ''
  },
  {
    _id: '2',
    name: '<h1>hi</h1>',
    admin: '1',
    participants: ['1', '2'],
    private: false,
    lastMessage: 'hi',
    lastTimestamp: ''
  }
]

const UserRooms = ({rooms=defaultRooms, setRooms}) => {

  return (
    <>
      {rooms.map((room, i) => {
      return (
        <NavLink key={i} to={'/rooms/' + room._id} className='user-room-in-menu'>
        <div className="avatar-container">
          {room.roomImgUrl
          ?<img src={room.roomImgUrl} alt='' />
          :<Avatar name={room.name} />}
        </div>
          <div>
            <span className='room-name'>{room.name}</span>
            <span className='last-msg'>{room.lastMessage}</span>
          </div>
        </NavLink>

      )
    })}
    </>
  )
}

export default UserRooms