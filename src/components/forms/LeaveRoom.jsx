import React from 'react';
import { apiLeaveRoom } from '../../api/rooms';

const LeaveRoom = ({roomId, toggleLoading, toggleShowLeave}) => {

  const leaveRoom = (e)=>{
    toggleLoading();
    apiLeaveRoom(roomId)
    .catch(err=>console.log(err))
    .finally(() => {
      toggleLoading();
      toggleShowLeave();
      window.location.reload();
    });
  };

  return (
    <div className='form-container' onMouseDown={e=>{toggleShowLeave()}}>
    <div className="form-block" onMouseDown={e=>{e.stopPropagation();}}>
    <p>Do you really want to leave?</p>
    <div className="btns-container">
      <button onClick={leaveRoom}>Yes</button>
      <button onClick={e=>{toggleShowLeave()}}>Cancel</button>
    </div>
    </div>
    </div>
  )
};

export default LeaveRoom;