import React from 'react';
import { getUser } from '../services/localStorage';
import { NavLink } from 'react-router-dom';

const initials = (name) => {
  const sArr = name.split(' ');
  let str;
  if (sArr.length>1) {
    str = (sArr[0][0]+sArr[1][0]).toUpperCase()
  } else {
    str = sArr[0][0].toUpperCase()
  }
  return str
}

const Message = ({text, author, msgDate}) => {  
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
        <div className="msg-box">
          <NavLink to={'/users/'+author.nickname}>{author.nickname}</NavLink>
          <p>{text}</p>
          <p>{msgDate}</p>
        </div>
    </div>)
    }
    </>
  )
}

export default Message