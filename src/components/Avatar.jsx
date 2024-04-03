import React, { useMemo } from 'react';
import randomColor from '../utils/randomColor';

const Avatar = ({name}) => {
  let str = name[0].toUpperCase();

  const randcolor = useMemo(randomColor,[]);

  return (
    <div style={{backgroundColor: randcolor.main, color:randcolor.contrast}}>
      {str}
    </div>
  )
}

export default Avatar