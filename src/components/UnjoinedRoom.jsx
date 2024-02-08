import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { apiJoinRoom } from '../api/rooms';
import { useLoading } from '../contexts/LoadingContext';

const UnjoinedRoom = ({name, roomImgUrl, admin, participants}) => {
  const {roomId} = useParams();
  const {toggleLoading} = useLoading();
  
  const joinRoom = (e) => {
    toggleLoading();
    apiJoinRoom(roomId)
    .catch(err=>console.log(err))
    .finally(() => {
      toggleLoading();
      window.location.reload();
    }); 
  };

  return (
    <div className="centering-container">
      <div className='room-info'>
        <div className='name-container'>
          <div className="avatar-container">
            {roomImgUrl
            ?<img src={roomImgUrl} alt='' />
            :<Avatar name={name} />}
          </div>
          <span>{name}</span>
        </div>
        <div className="list">
          <ul>
            <li>
              <NavLink to={'/users/'+admin.nickname}>
                <div className="avatar-container">
                  {admin.profileImgUrl
                  ?<img src={admin.profileImgUrl} alt='' />
                  :<Avatar name={admin.nickname} />}
                </div>
                <p>{admin.nickname}</p>
              </NavLink>
            </li>
            {participants.map((user, i) => {
              return (
                <li key={i}>
                  <NavLink to={'/users/'+user.nickname}>
                    <div className="avatar-container">
                      {user.profileImgUrl
                      ?<img src={user.profileImgUrl} alt='' />
                      :<Avatar name={user.nickname} />}
                    </div>
                    <span>{user.nickname}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="btns-container">
          <button onClick={joinRoom}>Join</button>
        </div>
      </div>
    </div>
  );
};

export default UnjoinedRoom;