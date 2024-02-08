import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { getUserRooms } from '../api/users';
import { useLoading } from '../contexts/LoadingContext';
import { privateRoom } from '../api/rooms';
import socket from '../socket';
import { getUser } from '../services/localStorage';

const OtherUserProfile = ({userNickname}) => {
  const [rooms, setRooms] = useState([]);
  const [userInfo, setUserInfo] = useState({}); 
  const navigate = useNavigate();
  const {toggleLoading} = useLoading();

  useEffect(() => {
    getUserRooms(userNickname).then(rsp => {
      setRooms(rsp.rooms);
      setUserInfo(rsp.userInfo);
    }).catch(err => {
      if (err.message !== 'no token') {
        navigate('/not-found', {replace: true});
      }
    })
  }, [userNickname, navigate]);

  const getToPrivateRoom = async () => {
    toggleLoading();
    try {
      const response = await privateRoom({userId: userInfo._id});
      if (response.newlyCreated) {
        let participantsInfo = [
          {
            nickname: getUser().nickname, 
            profileImgUrl: getUser().profileImgUrl
          }, 
          {
            nickname: userNickname,
            profileImgUrl: userInfo.profileImgUrl
          }];
        socket.emit('privateRoom',  {room: response, participantsInfo});
        navigate('/rooms/' + response._id);
      } else {
        navigate('/rooms/' + response.roomId);
      }
    } catch(err) {
      console.log(err);
    } finally {
      toggleLoading();
    }
  };

  return (
    <>
    <div className="name-container">
      <div className="avatar-container">
      {userInfo.profileImgUrl
      ?<img src={userInfo.profileImgUrl} alt='' />
      :<Avatar name={userNickname} />
      }
      </div>
    <p>{userNickname}</p>
    </div>
    <div className="list">
      <ul>
        {rooms.map((room, i) => {
          return (
            <li key={i}>
            <NavLink to={'/rooms/'+room._id}>
            <div className="avatar-container">
              {room.roomImgUrl
                ?<img src={room.roomImgUrl} alt='' />
                :<Avatar name={room.name} />}
            </div>
            <span>{room.name}</span>
            </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
    <div className="btns-container">
      <button onClick={getToPrivateRoom}>Write a message</button>
      <NavLink to="/create-room" state={{participant: userNickname}}>Create a room</NavLink>
    </div>
    </>
  )
};

export default OtherUserProfile;