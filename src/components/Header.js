import React, { useReducer } from 'react';
import NavButton from './NavButton';
import Nav from './Nav';

const Header = () => {
  const [showNav, toggleShowNav] = useReducer(showNav=>!showNav, false);


  return (
    <header>
      <div className='logo'>messageMe</div>
      <div className="btn-container">
        <NavButton showNav={showNav} toggleShowNav={toggleShowNav} />
      </div>
      {showNav
        ?<Nav toggleShowNav={toggleShowNav} />
        :null}
    </header>
  )
}

export default Header