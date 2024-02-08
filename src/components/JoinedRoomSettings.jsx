import React, { useReducer, useState } from 'react';
import Avatar from './Avatar';
import { NavLink, useParams } from 'react-router-dom';
import { getUser } from '../services/localStorage';
import RenameRoom from './forms/RenameRoom';
import compressedImg from '../utils/imageResizer';
import InviiteToRoom from './forms/InviteToRoom';
import { uploadRoomImg } from '../api/rooms';
import { useLoading } from '../contexts/LoadingContext';
import socket from '../socket';
import LeaveRoom from './forms/LeaveRoom';
import DeleteRoom from './forms/DeleteRoom';
import isFileImage from '../utils/isFileImg';

const JoinedRoomSettings = ({name, roomImgUrl, admin, participants, setRoom}) => {
  const [showRenameForm, toggleShowRename] = useReducer(show=>!show, false);
  const [showInviteForm, toggleShowInvite] = useReducer(show=>!show, false);
  const [showLeavePrompt, toggleShowLeave] = useReducer(show=>!show, false);
  const [showDeletePrompt, toggleShowDelete] = useReducer(show=>!show, false);
  const [errors, setErrors] = useState([]);

  const {toggleLoading} = useLoading();
  const {roomId} = useParams();
  
  const updateImg = async(img) => {
    setErrors([]);
    if(!isFileImage(img)){
      setErrors([{msg: 'please choose img'}]);
      return;
    }
    toggleLoading();
    try {
      const cmprImg = await compressedImg(img);
      const newRoomImgUrl = await uploadRoomImg(roomId, cmprImg);
      socket.emit('updateRoomImgUrl', {roomId, roomImgUrl: newRoomImgUrl});
      setRoom(room=>({...room, roomImgUrl: newRoomImgUrl}));
    } catch(err) {
      console.log(err);
    } finally {
      toggleLoading();
    }
  };

  return (
    <div>
      <div className='room-info'>
        <div className='name-container'>
          <div className="avatar-container">
            {roomImgUrl
            ?<img src={roomImgUrl} alt='' />
            :<Avatar name={name} />}
          </div>
          <p> {name} </p>
        </div>
        <div className="list">
          <ul>
            <li>
            <NavLink to={'/users/'+admin.nickname}>
                <div className="avatar-container">
                  {admin.profileImgUrl
                  ?<img src={admin.profileImgUrl} alt='' />
                  :<Avatar name={admin.nickname} />}
                </div>
                <span>{admin.nickname}</span>
              </NavLink>
            </li>
            {participants.map((user, i) => {
              return (
                <li key={i}>
                  <NavLink to={'/users/'+user.nickname}>
                    <div className="avatar-container">
                      {user.profileImgUrl
                      ?<img src={user.profileImgUrl} alt='' />
                      :<Avatar name={user.nickname} />}
                    </div>
                    <span>{user.nickname}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="btns-container">
          <button onClick={e=>{toggleShowRename()}}>Rename room</button>
          <input id="upload-img" type="file" onChange={(e)=>{updateImg(e.target.files[0])}} hidden/>
          <label htmlFor="upload-img">Upload room image</label>
          <button onClick={e=>{toggleShowInvite()}}>Invite to the room</button>
          {(getUser().nickname===admin.nickname)
          ?<button onClick={toggleShowDelete}>Delete the room</button>
          :<button onClick={toggleShowLeave}>Leave the room</button>}
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
      </div>
      {showRenameForm
      ?<RenameRoom setRoom={setRoom} roomName={name} toggleShowRename={toggleShowRename}/>
      :null}
      {showInviteForm
      ?<InviiteToRoom toggleShowInvite={toggleShowInvite} setRoom={setRoom} />
      :null}
      {showLeavePrompt
      ?<LeaveRoom roomId={roomId} toggleLoading={toggleLoading} toggleShowLeave={toggleShowLeave} />
      :null}
      {showDeletePrompt
      ?<DeleteRoom roomId={roomId} toggleLoading={toggleLoading} toggleShowDelete={toggleShowDelete} />
      :null}
    </div>
  )
};

export default JoinedRoomSettings;