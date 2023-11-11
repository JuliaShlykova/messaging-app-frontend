import React, { useEffect, useState } from 'react';
import { BsFillChatFill, BsFillPersonFill } from 'react-icons/bs';
import UserRooms from './UserRooms';
import OtherRooms from './OtherRooms';
import Users from './Users';

const ChatsBar = () => {
  const [navStatus, setNavStatus] = useState('UserRooms');
  const [usersOnlineCount, setUsersOnlineCount] = useState(0);

  return (
    <aside className='chats-bar'>
      <div className="chats-button-container">
        <button className={(navStatus==='UserRooms')?'':'not-active'} onClick={() => {setNavStatus('UserRooms')}} aria-label='chats list'>
          <BsFillChatFill />
        </button>
        <button className={(navStatus==='Users')?'':'not-active'} onClick={() => {setNavStatus('Users')}} aria-label='users'>
          <BsFillPersonFill />
          <span aria-hidden >{`(${usersOnlineCount})`}</span>
        </button>
        <button className={(navStatus==='NewRooms')?'':'not-active'} onClick={() => {setNavStatus('NewRooms')}} aria-label="new chats list">
          <BsFillChatFill />
          <span aria-hidden>new</span>
        </button>
      </div>
        <div className="nav-bar">
          {(navStatus==='UserRooms')
          ?<UserRooms />
          :((navStatus==='Users')
          ?<Users />
          :<OtherRooms />)}
        </div>
    </aside>
  )
}

export default ChatsBar