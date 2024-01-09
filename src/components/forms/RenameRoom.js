import React, { useState } from 'react'

const RenameRoom = ({setRoomName, roomName, toggleShowRename}) => {
  const [name, setName] = useState(roomName);
  const [errors, setErrors] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    if (roomName===name) {
      setErrors([{msg: 'New room name is as it was'}]);
      return;
    }
    setRoomName(name);
    toggleShowRename();
  }

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
}

export default RenameRoom