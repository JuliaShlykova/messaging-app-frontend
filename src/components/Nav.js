import React from 'react'
import { useNavigate } from 'react-router-dom'
import { clearStorage } from '../services/localStorage';
import { signout } from '../api/auth';

const Nav = ({toggleShowNav}) => {
  const navigator = useNavigate();

  const logout = async() => {
    // await signout();
    clearStorage();
    navigator('/login');
  }


  return (
    <div className="nav-container" onClick={() => {toggleShowNav()}}>
      <nav onClick={(e)=> {e.stopPropagation()}}>
        <ul>
          <li>
            <a href="/">nickname</a>
          </li>
          <li>
            <button>create new chat</button>
          </li>
          <li>
            <button onClick={logout}>log out</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav