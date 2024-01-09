import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import roomUrl from '../assets/images/1.jpg';


const OtherUserProfile = ({userNickname}) => {
  const [rooms, setRooms] = useState([
    {
      _id: '1',
      name: 'ornare. Fusce fermentum risus arcu, ultrices phare…unc magna odio, rutrum ac ligula sed, consequat r',
      roomImgUrl: '../assets/images/1.jpg'
    },
    {
      _id: '2',
      name: 'Default2',
    },
    {
      _id: '2',
      name: 'Default2',
    },
    {
      _id: '2',
      name: 'Default2',
    },
    {
      _id: '2',
      name: 'Default2',
    }
  ]);

  return (
    <>        <div className="name-container">
    <div className="avatar-container">
      <Avatar name={userNickname} />
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
                    //?<img src={room.roomImgUrl} alt='' />
                    ?<img src={roomUrl} alt='' />
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
          <button>Write a message</button>
          <NavLink to="/create-room" state={{participant: userNickname}}>Create a room</NavLink>
        </div></>
  )
}

export default OtherUserProfile