import React, { useReducer, useState } from 'react';
import { getUser } from '../services/localStorage';
import Avatar from './Avatar';
import RenameUser from './forms/RenameUser';
import compressedImg from '../utils/imageResizer';

const CurUserProfile = ({userNickname}) => {
  const [nickname, setNickname] = useState(userNickname);
  const [showRenameForm, toggleShowRename] = useReducer(show=>!show, false);
  const [uplProfileImg, setUplProfileImg] = useState(null);

  const compressingImg = async(img) => {
    try {
      const cmprImg = await compressedImg(img);
      setUplProfileImg(cmprImg);
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="name-container">
        <div className="avatar-container">
          {uplProfileImg
          ?<img src={uplProfileImg} alt='' />
          :<Avatar name={userNickname} />}
        </div>
        <p>{nickname}</p>
      </div>
      <div className="btns-container">
        <button onClick={e=>{toggleShowRename()}}>Edit Nickname</button>
        <input id="upload-img" type="file" onChange={(e)=>{compressingImg(e.target.files[0])}} hidden/>
          <label htmlFor="upload-img">Upload profile image</label>
      </div>
      {showRenameForm
      ?<RenameUser setNickname={setNickname} nickname={nickname} toggleShowRename={toggleShowRename}/>
      :null}
    </>
  )
}

export default CurUserProfile