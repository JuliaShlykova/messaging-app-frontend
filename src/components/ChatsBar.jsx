import React, { useEffect, useReducer, useState } from 'react';
import { BsFillChatFill, BsFillPersonFill } from 'react-icons/bs';
import { IoChatbubbles } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import useWindowDimensions from '../hooks/useWindowDimesions';
import UserRooms from './UserRooms';
import OtherRooms from './OtherRooms';
import Users from './Users';
import { useLoading } from '../contexts/LoadingContext';
import { getRooms, getOtherRooms } from '../api/rooms';
import sortedArr from '../utils/sortedDateArr';
import socket from '../socket';
import { getUser } from '../services/localStorage';

const re = /\/([\w-]+)\//;
let curUrl = window.location.pathname.match(re)?window.location.pathname.match(re)[1]:'';

const ChatsBar = ({users, setUsers}) => {
  const [navStatus, setNavStatus] = useState('UserRooms');
  const [displayMenu, toggleDisplay] = useReducer(disp=>!disp, false);
  const [usersOnlineCount, setUsersOnlineCount] = useState(0);
  const { width } = useWindowDimensions();
  const {toggleLoading} = useLoading();
  const [rooms, setRooms] = useState([]);
  const [otherRooms, setOtherRooms] = useState([]);
  
  if(window.location.pathname.match(re)&&curUrl!==window.location.pathname.match(re)[1]) {
    curUrl = window.location.pathname.match(re)[1];
    if (curUrl==='users'&&navStatus!=='Users') {
      setNavStatus('Users');
    } else if (curUrl==='rooms'&&navStatus==='Users') {
      setNavStatus('UserRooms');
    }
  }

  useEffect(() => {
    socket.on('onlineUsers', onlineUsers => {
      setUsersOnlineCount(onlineUsers.length);
      setUsers(users => {
        let newUsers = [...users];
        for (let onlineUser of onlineUsers) {
          for (let i=0; i<users.length;i++) {
            if (onlineUser.nickname===users[i].nickname) {
              newUsers[i].online=true;
              continue;
            }
            if (i===users.length-1) {
              newUsers.push({...onlineUser, online: true});
            }
          }
        }
        return newUsers;
      })
    });

    return () => {
      socket.removeAllListeners('onlineUsers');
    }
  }, [setUsers])

  useEffect(() => {
    toggleLoading();
    const fetchData = async () => {
      const roomsPrm = getRooms();
      const othRoomsPrm = getOtherRooms();
      const [roomsResponse, otherRoomsResponse] = await Promise.all([roomsPrm, othRoomsPrm]);
      setRooms(sortedArr(roomsResponse));
      setOtherRooms(otherRoomsResponse);
    }
    fetchData().catch(err => {
      console.log(err);
    }).finally(() => {
      toggleLoading();
    })
  },[toggleLoading]);

  useEffect(() => {
    socket.on('createRoom', (room) => {
      if (getUser().id===room.admin||room.participants.includes(getUser().id)) {
        setRooms(rooms => [{...room, lastMessage: `created at ${room.formatted_timestamp}`, lastTimestamp: room.createdAt}, ...rooms])
      } else if(!room.private) {
        setOtherRooms(rooms => [{name: room.name, _id: room._id}, ...rooms]);
      }
    })
    return () => {
      socket.removeAllListeners('createRoom');
    }
  }, [])

  return (
    <>
    <aside className='chats-bar' style={width<700?{display: displayMenu?'block':'none'}:{}}>
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
          ?<UserRooms rooms={rooms} setRooms={setRooms} />
          :((navStatus==='Users')
          ?<Users users={users} />
          :<OtherRooms rooms={otherRooms} setRooms={setOtherRooms} />)}
        </div>
    </aside>
    {width<700
    ?<div className='chatsbar-toggler' style={displayMenu?{left: '300px'}: {}} onClick={e=>{toggleDisplay()}}>
    {displayMenu
    ?<IoIosCloseCircle />
    :<IoChatbubbles />}
    </div>
    :null}
    </>
  )
}

export default ChatsBar