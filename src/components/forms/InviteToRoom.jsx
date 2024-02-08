import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import { getUsersToInvite, inviteUsers } from '../../api/rooms';
import { useParams } from 'react-router-dom';
import formDataToJSON from '../../utils/formDataToJSON';
import { useLoading } from '../../contexts/LoadingContext';

const InviiteToRoom = ({toggleShowInvite, setRoom}) => {
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);

  const {roomId} = useParams();
  const {toggleLoading} = useLoading();

  useEffect(() => {
    const fetchData = async() => {
      const fetchedUsers = await getUsersToInvite(roomId);
      setUsers(fetchedUsers);
    }
    fetchData().catch(err => {
      console.log(err);
    });
  }, [roomId]);


  const submitForm = async(e) => {
    toggleLoading();
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    if (!formData.has('participants')) {
      setErrors([{msg: 'invite at least one person'}]);
      return;
    }
    const formJSON = formDataToJSON(formData);
    try {
      const newParticipants = await inviteUsers(roomId, formJSON);
      const newParticipnatsInfo = users.filter(user=>newParticipants.includes(user._id));
      setRoom(room=>{
        const updatedParticipants = [...room.participants, ...newParticipnatsInfo];
        return {...room, participants: updatedParticipants};
      })
    } catch(err) {
      console.log(err);
    } finally {
      toggleLoading();
      toggleShowInvite();
    }
  };

  return (
    <div className='form-container' onMouseDown={toggleShowInvite}>
      <div className="form-block" onMouseDown={e=>{e.stopPropagation()}}>
      <form onSubmit={submitForm}>
        <h1>Invite users:</h1>
        <ul className='list-to-invite'>
          {users.map((user,i) =>
            <li key={i}>
              <label htmlFor={user.nickname}>
              <input type="checkbox" id={user.nickname} value={user._id} name="participants" />
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

export default InviiteToRoom;