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
import updatedUsers from '../utils/updatingOnlineUsers';

const re = /\/([\w-]+)\//;
let curUrl = window.location.pathname.match(re)?window.location.pathname.match(re)[1]:'';

const ChatsBar = ({users, setUsers}) => {
  const [navStatus, setNavStatus] = useState('UserRooms');
  const [displayMenu, toggleDisplay] = useReducer(disp=>!disp, false);
  const [usersOnlineCount, setUsersOnlineCount] = useState(0);
  const [loggedUsers, setLoggedUsers] = useState([]);
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
  };

  useEffect(() => {
      socket.on('onlineUsers', onlineUsers => {
        setLoggedUsers(onlineUsers);
      });
      socket.on('renameRoom', ({roomId, newName}) => {
        setRooms(oldRooms=>{
          let i = oldRooms.findIndex(room=>room._id===roomId);
          let newRooms = [...oldRooms];
          newRooms[i].name = newName;
          return newRooms;
        })
      });
      socket.on('lastMessage', ({roomId, lastMsg}) => {
        setRooms(oldRooms=>{
          let i = oldRooms.findIndex(room=>room._id===roomId);
          let newRooms = [...oldRooms];
          newRooms[i].lastMessage = lastMsg;
          return newRooms;
        })
      });
      socket.on('newRoomImg', ({roomId, roomImgUrl}) => {
        setRooms(oldRooms=>{
          let i = oldRooms.findIndex(room=>room._id===roomId);
          let newRooms = [...oldRooms];
          newRooms[i].roomImgUrl = roomImgUrl;
          return newRooms;
        })
      });
      socket.on('deleteRoom', ({roomId}) => {
        setRooms(oldRooms=>{
          let i = oldRooms.findIndex(room=>room._id===roomId);
          let newRooms;
          if (i>0) {
            newRooms = [...oldRooms.slice(0,i), ...oldRooms.slice(i+1)];
          } else if (i===0) {
            newRooms = oldRooms.slice(1);
          } else {
            return oldRooms;
          }
          return newRooms;
        });
        setOtherRooms(oldRooms=>{
          let i = oldRooms.findIndex(room=>room._id===roomId);
          let newRooms;
          if (i>0) {
            newRooms = [...oldRooms.slice(0,i), ...oldRooms.slice(i+1)];
          } else if (i===0) {
            newRooms = oldRooms.slice(1);
          } else {
            return oldRooms;
          }
          return newRooms;
        })
      });

    return () => {
      socket.removeAllListeners('onlineUsers');
      socket.removeAllListeners('renameRoom');
      socket.removeAllListeners('lastMessage');
      socket.removeAllListeners('newRoomImg');
      socket.removeAllListeners('deleteRoom');
      setLoggedUsers([]);
    }
  }, []);

  useEffect(() => {
    loggedUsers.length?setUsersOnlineCount(loggedUsers.length-1):setUsersOnlineCount(0);
    setUsers(users => updatedUsers(users, loggedUsers, getUser));
  }, [loggedUsers, setUsers]);

  useEffect(() => {
    toggleLoading();
    const fetchData = async () => {
      const roomsPrm = getRooms();
      const othRoomsPrm = getOtherRooms();
      const [roomsResponse, otherRoomsResponse] = await Promise.all([roomsPrm, othRoomsPrm]);
      setRooms(sortedArr(roomsResponse));
      setOtherRooms(otherRoomsResponse);
    }
    fetchData().then(res => {
      socket.emit('getOnlineUsers');
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      toggleLoading();
    })
  },[toggleLoading]);

  useEffect(() => {
    socket.on('createRoom', ({room, participantsInfo=[]}) => {
      if (room.private) {
        let partnerInfo = participantsInfo.find(user=>user.nickname!==getUser().nickname);
        setRooms(rooms => [
          {...room, 
            name: partnerInfo.nickname, 
            roomImgUrl: partnerInfo.profileImgUrl, 
            lastMessage: `created at ${room.formatted_timestamp}`, 
            lastTimestamp: room.createdAt
          },
          ...rooms]);
      } else if (getUser().id===room.admin||room.participants.includes(getUser().id)) {
        setRooms(rooms => [
          {...room, 
            lastMessage: `created at ${room.formatted_timestamp}`, 
            lastTimestamp: room.createdAt
          }, 
          ...rooms
        ])
      } else {
        setOtherRooms(rooms => [
          {name: room.name, _id: room._id}, 
          ...rooms
        ]);
      }
    });
    return () => {
      socket.removeAllListeners('createRoom');
    }
  }, []);

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
          ?<UserRooms rooms={rooms} />
          :((navStatus==='Users')
          ?<Users users={users} />
          :<OtherRooms rooms={otherRooms} />)}
        </div>
    </aside>
    {width<700
    ?<div 
      className='chatsbar-toggler' 
      style={displayMenu?{left: '300px'}: {}} 
      onClick={e=>{toggleDisplay()}}>
        {displayMenu
        ?<IoIosCloseCircle />
        :<IoChatbubbles />}
      </div>
    :null}
    </>
  )
};

export default ChatsBar;