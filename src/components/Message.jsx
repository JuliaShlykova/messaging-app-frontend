import React, { memo } from 'react';
import { getUser } from '../services/localStorage';
import { NavLink } from 'react-router-dom';

const initials = (name) => {
  const sArr = name.split(/\s+/);
  let str;
  if (sArr.length>1) {
    str = (sArr[0][0]+sArr[1][0]).toUpperCase();
  } else {
    str = sArr[0][0].toUpperCase();
  }
  return str;
}

const Message = memo(({text, author, msgDate}) => {  
  return (
    <>
    {
    getUser().nickname===author.nickname
    ?(<div className="userMsg">
          <p>{text}</p>
          <p>{msgDate}</p>
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