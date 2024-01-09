import React, { useMemo, useState } from 'react';
import randomColor from '../utils/randomColor';

const Avatar = ({name}) => {
  const sArr = name.split(' ');
  let str;
  if (sArr.length>1) {
    str = (sArr[0][0]+sArr[1][0]).toUpperCase()
  } else {
    str = sArr[0][0].toUpperCase()
  }

  const randcolor = useMemo(randomColor,[]);

  return (
    <div style={{backgroundColor: randcolor.main, color:randcolor.contrast}}>
      {str}
    </div>
  )
}

export default Avatar