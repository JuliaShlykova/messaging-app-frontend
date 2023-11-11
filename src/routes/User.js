import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const User = () => {
  const { userNickname } = useParams();
  const [rooms, setRooms] = useState([
    {
      _id: '1',
      name: 'Default',
      roomImgUrl: '../assets/images/1.jpg'
    },
    {
      _id: '2',
      name: 'Default2',
    }
  ])

  return (
    <div className='centering-container'>
      <div>
        <div className="name-container">
          User {userNickname}
        </div>
        <div className="list">
          <ul>
            {rooms.map((room, i) => {
              return (
                <li key={i}>
                <NavLink to={'/rooms/'+room._id}>
                {room.name}
                </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default User