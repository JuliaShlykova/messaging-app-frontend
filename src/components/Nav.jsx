import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/localStorage';
import { signout } from '../api/auth';
import Avatar from './Avatar';

const Nav = ({toggleShowNav}) => {

  return (
    <div className="nav-container" onClick={toggleShowNav}>
      <nav onClick={(e)=> {e.stopPropagation()}}>
        <ul>
          <li>
            <Link onClick={toggleShowNav} to={"/users/"+getUser().nickname}>
            <div className="avatar-container">
              {getUser().profileImgUrl
              ?<img src={getUser().profileImgUrl} alt='' />
              :<Avatar name={getUser().nickname} />}
            </div>
            <p>{getUser().nickname}</p>
            </Link>
          </li>
          <li>
          <Link onClick={toggleShowNav} to={"/create-room"}>Create Room</Link>
          </li>
          <li>
            <button onClick={signout}>Log Out</button>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Nav;