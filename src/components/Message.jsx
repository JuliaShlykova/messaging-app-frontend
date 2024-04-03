import React, { memo } from 'react';
import { getUser } from '../services/localStorage';
import { NavLink } from 'react-router-dom';
import transforDateToLocal from '../utils/transformDateToLocal';

const initials = (name) => {
  let str = name[0].toUpperCase();
  return str;
}

const Message = memo(({text, author, msgDate}) => {  
  return (
    <>
    {
    getUser().nickname===author.nickname
    ?(<div className="userMsg">
          <p>{text}</p>
          <p>{transforDateToLocal(msgDate)}</p>
      </div>)
    :(<div className="compMsg">
        <NavLink to={'/users/'+author.nickname} className="avatar-container">
          {author.profileImgUrl
          ?<img src={author.profileImgUrl} alt='' />
          :<div>{initials(author.nickname)}</div>}
        </NavLink>
        <div style={{display:'flex', flexDirection: 'column'}}>
          <NavLink className='comp-user-name' to={'/users/'+author.nickname}>{author.nickname}</NavLink>
          <div className="msg-box">
            <p>{text}</p>
            <p>{msgDate}</p>
          </div>
        </div>
    </div>)
    }
    </>
  )
});

export default Message;