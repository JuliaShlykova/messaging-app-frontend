import React from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/localStorage';
import CurUserProfile from '../components/CurUserProfile';
import OtherUserProfile from '../components/OtherUserProfile';

const User = () => {
  const { userNickname } = useParams();

  return (
    <div className='centering-container'>
      <div className='user-info'>
        {(getUser().nickname===userNickname)
        ?<CurUserProfile userNickname={userNickname} />        
        :<OtherUserProfile userNickname={userNickname}/>}
      </div>
    </div>
  )
};

export default User;