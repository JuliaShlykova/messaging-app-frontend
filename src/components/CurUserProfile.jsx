import React, { useReducer, useState } from 'react';
import { getUser, setUser } from '../services/localStorage';
import Avatar from './Avatar';
import RenameUser from './forms/RenameUser';
import compressedImg from '../utils/imageResizer';
import { useLoading } from '../contexts/LoadingContext';
import { updateProfileImg } from '../api/users';
import isFileImage from '../utils/isFileImg';

const CurUserProfile = ({userNickname}) => {
  const [nickname, setNickname] = useState(userNickname);
  const [showRenameForm, toggleShowRename] = useReducer(show=>!show, false);
  const [errors, setErrors] = useState([]);

  const {toggleLoading} = useLoading();

  const updateImg = async(img) => {
    setErrors([]);
    if(!isFileImage(img)){
      setErrors([{msg: 'please choose img'}]);
      return;
    };
    toggleLoading();
    try {
      const cmprImg = await compressedImg(img);
      const newprofileImgUrl = await updateProfileImg(cmprImg);
      setUser({...getUser(), profileImgUrl: newprofileImgUrl});
    } catch(err) {
      console.log(err);
    } finally {
      toggleLoading();
    }
  };
   
  return (
    <>
      <div className="name-container">
        <div className="avatar-container">
          {getUser().profileImgUrl
          ?<img src={getUser().profileImgUrl} alt='' />
          :<Avatar name={userNickname} />}
        </div>
        <p>{nickname}</p>
      </div>
      <div className="btns-container">
        <button onClick={e=>{toggleShowRename()}}>Edit Nickname</button>
        <input id="upload-img" type="file" onChange={(e)=>{updateImg(e.target.files[0])}} hidden/>
          <label htmlFor="upload-img">Upload Profile Image</label>
      </div>
      {errors.length
          ?<div className="errors">
            {errors.map((err, i) => {
              return (
                <p key={i}>{err.msg}</p>
              )
            })}
          </div>
          :null
        }
      {showRenameForm
      ?<RenameUser setNickname={setNickname} nickname={nickname} toggleShowRename={toggleShowRename}/>
      :null}
    </>
  )
};

export default CurUserProfile;