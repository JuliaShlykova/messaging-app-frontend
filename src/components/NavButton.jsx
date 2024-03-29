import React from 'react';

const NavButton = ({showNav, toggleShowNav}) => {

  return (
    <button onClick={toggleShowNav} title='menu'>
      <svg version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100" id="nav-button">
          <g id="sticks" className={showNav?'clicked-sticks':''}>
            <path className='stick' d="M 0 0 L 100 0" />
            <path className='stick' d="M 0 0 L 100 0" />
            <path className='stick' d="M 0 0 L 100 0" />
          </g>
          {showNav
          ?(<g id="sticks-crossed">
            <path className='stick' d="M 0 0 L 100 0" />
            <path className='stick' d="M 0 0 L 100 0" />
            <path className='stick' d="M 0 0 L 100 0" />
          </g>)
          :null}
        </svg>
    </button>
  )
};

export default NavButton;