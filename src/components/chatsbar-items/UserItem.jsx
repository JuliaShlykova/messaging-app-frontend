import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar';

const UserItem = memo(({nickname, profileImgUrl, online=false}) => {
  return (
    <NavLink to={'/users/' + nickname}>
    <div className="avatar-container">
      {profileImgUrl
      ?<img src={profileImgUrl} alt='' />
      :<Avatar name={nickname} />}
    </div>
    <span>{nickname}</span>
    <span className='online-status'>{online?'online':''}</span>
  </NavLink>
  )
});

export default UserItem;