import React from 'react';
import UserItem from './chatsbar-items/UserItem';

const Users = ({users=[]}) => {

  return (
    <>
    {users.map((user, i) => 
      <UserItem
        key={i} 
        nickname={user.nickname} 
        profileImgUrl={user.profileImgUrl} 
        online={user.online} 
      />)}
    </>
  )
};

export default Users;