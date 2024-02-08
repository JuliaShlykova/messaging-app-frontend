import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar';

const UserRoomItem = memo(({roomId, roomImgUrl, name, lastMessage}) => {

  return (
    <NavLink to={'/rooms/' + roomId} className='user-room-in-menu'>
    <div className="avatar-container">
      {roomImgUrl
      ?<img src={roomImgUrl} alt='' />
      :<Avatar name={name} />}
    </div>
      <div>
        <span className='room-name'>{name}</span>
        <span className='last-msg'>{lastMessage}</span>
      </div>
    </NavLink>
  )
});

export default UserRoomItem;