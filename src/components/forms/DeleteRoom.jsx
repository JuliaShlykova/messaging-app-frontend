import React from 'react';
import { apiDeleteRoom } from '../../api/rooms';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';

const DeleteRoom = ({roomId, toggleLoading, toggleShowDelete}) => {

  const navigate = useNavigate();

  const deleteRoom = (e)=>{
    toggleLoading()
    apiDeleteRoom(roomId)
    .then(()=>{
      socket.emit('deleteRoom', {roomId});
    })
    .catch(err=>console.log(err))
    .finally(() => {
      toggleLoading();
      toggleShowDelete();
      navigate('/');
    });    
  };

  return (
    <div className='form-container' onMouseDown={e=>{toggleShowDelete()}}>
    <div className="form-block" onMouseDown={e=>{e.stopPropagation();}}>
    <p>Do you really want to delete?</p>
    <div className="btns-container">
      <button onClick={deleteRoom}>Yes</button>
      <button onClick={e=>{toggleShowDelete()}}>Cancel</button>
    </div>
    </div>
    </div>
  )
};

export default DeleteRoom;