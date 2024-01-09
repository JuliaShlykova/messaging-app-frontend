import React, { useReducer, useState } from 'react'
import Avatar from './Avatar'
import { NavLink } from 'react-router-dom'
import { getUser } from '../services/localStorage'
import RenameRoom from './forms/RenameRoom';
import compressedImg from '../utils/imageResizer';
import InviiteToRoom from './forms/InviteToRoom';

const JoinedRoomSettings = ({name, roomImgUrl, admin, participants}) => {
  const [roomName, setRoomName] = useState(name);
  const [showRenameForm, toggleShowRename] = useReducer(show=>!show, false);
  const [showInviteForm, toggleShowInvite] = useReducer(show=>!show, false);
  const [uplProfileImg, setUplProfileImg] = useState(roomImgUrl);
  
  const compressingImg = async(img) => {
    try {
      const cmprImg = await compressedImg(img);
      setUplProfileImg(cmprImg);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className='room-info'>
        <div className='name-container'>
          <div className="avatar-container">
            {uplProfileImg
            ?<img src={uplProfileImg} alt='' />
            :<Avatar name={roomName} />}
          </div>
          <p> {roomName} </p>
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
          <input id="upload-img" type="file" onChange={(e)=>{compressingImg(e.target.files[0])}} hidden/>
          <label htmlFor="upload-img">Upload room image</label>
          <button onClick={e=>{toggleShowInvite()}}>Invite to the room</button>
          {(getUser().nickname===admin.nickname)?null:<button>Leave the room</button>}
        </div>
      </div>
      {showRenameForm
      ?<RenameRoom setRoomName={setRoomName} roomName={roomName} toggleShowRename={toggleShowRename}/>
      :null}
      {showInviteForm
      ?<InviiteToRoom toggleShowInvite={toggleShowInvite}/>
      :null}
    </div>
  )
}

export default JoinedRoomSettings