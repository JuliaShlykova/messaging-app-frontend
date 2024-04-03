import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar';
import transforDateToLocal from '../../utils/transformDateToLocal';

const UserRoomItem = memo(({roomId, roomImgUrl, name, createdAt, lastMessage}) => {

  return (
    <NavLink to={'/rooms/' + roomId} className='user-room-in-menu'>
    <div className="avatar-container">
      {roomImgUrl
      ?<img src={roomImgUrl} alt='' />
      :<Avatar name={name} />}
    </div>
      <div>
        <span className='room-name'>{name}</span>
        <span className='last-msg'>{lastMessage?lastMessage:(`created at ${transforDateToLocal(createdAt)}`)}</span>
      </div>
    </NavLink>
  )
});

export default UserRoomItem;