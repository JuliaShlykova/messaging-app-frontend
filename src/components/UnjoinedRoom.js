import React from 'react'
import { NavLink } from 'react-router-dom';

const UnjoinedRoom = ({name, roomImgUrl, admin, participants}) => {

  return (
    <div className="centering-container">
      <div className='name-container'>
        UnjoinedRoom {name}
      </div>
      <div className="list">
        <ul>
          <li>
            <NavLink to={'/users/'+admin._id}>{admin.nickanme}</NavLink>
          </li>
          {participants.map((user, i) => {
            return (
              <li key={i}>
                <NavLink to={'/users/'+user._id}>
                  {user.nickname}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default UnjoinedRoom