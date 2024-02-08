import React, { useState } from 'react'
import { renameRoom } from '../../api/rooms';
import { useParams } from 'react-router-dom';
import socket from '../../socket';

const RenameRoom = ({setRoom, roomName, toggleShowRename}) => {
  const [name, setName] = useState(roomName);
  const [errors, setErrors] = useState([]);

  const {roomId} = useParams();

  const submitForm = async(e) => {
    e.preventDefault();
    if (roomName===name) {
      setErrors([{msg: 'New room name is the same as old one'}]);
      return;
    }
    try {
      const updatedRoom = await renameRoom(roomId, name);
      console.log('updatedRoom', updatedRoom);
      socket.emit('renameRoom', {roomId, newName: name})
      setRoom(room=>({...room, name}));
      toggleShowRename();
    } catch(err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className='form-container' onMouseDown={e=>{toggleShowRename()}}>
      <div className="form-block" onMouseDown={e=>{e.stopPropagation();}}>
      <form onSubmit={submitForm}>
        <label htmlFor="name">New room name: (maximum length is 100 chars)</label>
        <input type="text" id='name' value={name} onChange={e=>{setName(e.target.value)}} required maxLength={100}/>
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
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
};

export default RenameRoom;