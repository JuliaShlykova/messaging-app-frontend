import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import formDataToJSON from '../utils/formDataToJSON';
import { createRoom } from '../api/rooms';
import socket from '../socket';

const CreateRoom = ({users=[]}) => {
  const location = useLocation();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitForm = async(e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    if (!formData.has('participants')) {
      setErrors([{msg: 'invite at least one person'}]);
      return;
    }
    try {
      const response = await createRoom(formDataToJSON(formData));
      socket.emit('createRoom', response);
      navigate('/rooms/'+response._id);
    } catch(err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <div className='centering-container'>
      <div className='form-block'>
        <form onSubmit={submitForm}>
          <h1>Create Room</h1>
          <label htmlFor="room-name">Room Name: (maximum length is 100 chars)</label>
          <input type="text" id="room-name" name="name" maxLength={100} required/>
          <fieldset>
            <legend>Invite users: </legend>
            <ul className='list-to-invite'>
              {users.map((user,i) =>
                <li key={i}>
                  <label htmlFor={user.nickname}>
                  <input type="checkbox" id={user.nickname} value={user._id} name="participants" defaultChecked={user.nickname===location.state?.participant} />
                  <div className="avatar-container">
                        {user.profileImgUrl
                        ?<img src={user.profileImgUrl} alt='' />
                        :<Avatar name={user.nickname} />}
                      </div>
                      <p>{user.nickname}</p>
                  </label>
                </li>
              )}
            </ul>
          </fieldset>
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

export default CreateRoom;