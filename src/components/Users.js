import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar';
import { getUsers } from '../api/users';

const defaultUsers = [
  {
    _id: '1',
    nickname: 'John Wick'
  },
  {
    _id: '2',
    nickname: 'Hugh Lori'
  },
  {
    _id: '3',
    nickname: 'useruseruser1'
  }
];

const Users = ({users=defaultUsers, setUsers}) => {

  return (
    <>
      {users.map((user, i) => {
        return(
          <NavLink key={i} to={'/users/' + user.nickname}>
            <div className="avatar-container">
              {user.profileImgUrl
              ?<img src={user.profileImgUrl} alt='' />
              :<Avatar name={user.nickname} />}
            </div>
            <span>{user.nickname}</span>
            <span className='online-status'>{user.online?'online':''}</span>
          </NavLink>
        )
      })}
    </>
  )
}

export default Users