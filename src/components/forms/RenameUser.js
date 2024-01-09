import React, { useState } from 'react';
import {getUser} from '../../services/localStorage';

const RenameUser = ({setNickname, nickname, toggleShowRename}) => {
  const [name, setName] = useState(nickname);
  const [errors, setErrors] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    if (getUser().nickname===name) {
      setErrors([{msg: 'Your new nickname is as it was'}]);
      return;
    }
    setNickname(name);
    toggleShowRename();
  }

  return (
    <div className='form-container' onMouseDown={e=>{toggleShowRename()}}>
      <div className="form-block" onMouseDown={e=>{e.stopPropagation();}}>
      <form onSubmit={submitForm}>
        <label htmlFor="name">New nickname: (maximum length is 100 chars)</label>
        <input type="text" id='name' value={name} onChange={e=>{setName(e.target.value)}} required maxLength={40}/>
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

export default RenameUser