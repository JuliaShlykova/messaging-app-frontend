import React, { useState } from 'react';
import socket from '../../socket';
import { useParams } from 'react-router-dom';
import { sendMessage } from '../../api/rooms';
import { getUser } from '../../services/localStorage';

const CreateMessage = ({setMessages}) => {
  const [newMessage, setNewMessage] = useState('');
  const {roomId} = useParams();
  const [errors, setErrors] = useState([]);

  const createMessage = async(e) => {
    e.preventDefault();
    if (errors.length) setErrors([]);
    try {
      const response = await sendMessage(roomId, newMessage);
      const messageWithInfo = {...response.message, author: {nickname: getUser().nickname, _id: getUser().id, profileImgUrl: getUser().profileImgUrl}};
      socket.send(messageWithInfo);
      setMessages(oldMessages=>[...oldMessages, messageWithInfo]);
      setNewMessage('');
    } catch(err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className='create-message'>
    <form onSubmit={createMessage}>
      <label htmlFor="message-text" className='hidden'>Message text</label>
      <input type="text" id="message-text" placeholder='Enter text...' value={newMessage} onChange={e=>{setNewMessage(e.target.value)}} autoComplete='off' maxLength={300} required/>
      <button type="submit">Send</button>
    </form>
    <span className='msg-limit'>{newMessage.length}/300</span>
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
  )
};

export default CreateMessage;