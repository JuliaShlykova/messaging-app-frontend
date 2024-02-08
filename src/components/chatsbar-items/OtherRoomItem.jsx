import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar';

const OtherRoomItem = ({room}) => {
  return (
    <NavLink to={'/rooms/' + room._id}>
    <div className="avatar-container">
      {room.roomImgUrl
      ?<img src={room.roomImgUrl} alt='' />
      :<Avatar name={room.name} />}
    </div>
      <span>{room.name}</span>
    </NavLink>
  )
};

export default OtherRoomItem;