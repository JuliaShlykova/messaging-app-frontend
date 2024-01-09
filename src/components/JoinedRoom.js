import React, { useEffect, useReducer, useRef, useState } from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
import JoinedRoomSettings from './JoinedRoomSettings';
import { MdWavingHand } from "react-icons/md";
import Message from './Message';

const JoinedRoom = ({privateRoom, name, roomImgUrl, admin=undefined, participants, messages}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showSettings, toggleShow] = useReducer(show=>!show, false);

  const elRef = useRef();

  useEffect(() => {
    if (!showSettings&&(messages.length>0)) {
      elRef.current.scrollIntoView();
    }
  },[showSettings])

  const createMessage = (e) => {
    e.preventDefault();
  }

  return (
    <div className="centering-container">
    {privateRoom
    ?null
    :<div className="settings" onClick={e=>{toggleShow()}}>
        {showSettings
        ?<GiReturnArrow />
        :<IoSettingsSharp />}
      </div>
      }
      {!privateRoom&&showSettings
      ?<JoinedRoomSettings name={name} roomImgUrl={roomImgUrl} admin={admin} participants={participants}/>
      :<div className="chat-container">
        <div className="chat-area">
        {(messages.length>0)
        ?<>{messages.map((msg, i) => 
            <Message key={i} text={msg.text} msgDate={msg.formatted_timestamp} author={msg.author} />
          )}
          <div ref={elRef} /></>
          :<div className="svg-container">
            <MdWavingHand />
          </div>}
        </div>
        
        <div className='create-message'>
          <form onSubmit={createMessage}>
            <label htmlFor="message-text" className='hidden'>Message text</label>
            <input type="text" id="message-text" placeholder='Enter text...' value={newMessage} onChange={e=>{setNewMessage(e.target.value)}} autoComplete='off' maxLength={300}/>
            <button type="submit">Send</button>
          </form>
          <span className='msg-limit'>{newMessage.length}/300</span>
        </div>
      </div>
      }
    </div>
  )
}

export default JoinedRoom