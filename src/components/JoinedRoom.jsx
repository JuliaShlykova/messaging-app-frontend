import React, { useEffect, useReducer, useRef } from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
import JoinedRoomSettings from './JoinedRoomSettings';
import { MdWavingHand } from "react-icons/md";
import Message from './Message';
import CreateMessage from './forms/CreateMessage';
import socket from '../socket';

const JoinedRoom = ({privateRoom, name, roomImgUrl, admin=undefined, participants, messages, setMessages, setRoom}) => {
  const [showSettings, toggleShow] = useReducer(show=>!show, false);
  const elRef = useRef();

  useEffect(() => {
    socket.on('message', newMessage => {
      setMessages(oldMessages=>[...oldMessages, newMessage]);
    });
    return () => {
      socket.removeAllListeners('message');
    }
  }, [setMessages]);

  useEffect(() => {
    if (!showSettings) {
      elRef.current.scrollIntoView();
    }
  },[showSettings]);

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
      ?<JoinedRoomSettings 
        name={name} 
        roomImgUrl={roomImgUrl} 
        admin={admin} 
        participants={participants} 
        setRoom={setRoom}
      />
      :<div className="chat-container">
        <div className="chat-area">
        {(messages.length>0)
        ?<>{messages.map((msg, i) => 
            <Message key={i} text={msg.text} msgDate={msg.formatted_timestamp} author={msg.author} />
          )}
          <div ref={elRef} /></>
          :<div className="svg-container" ref={elRef}>
            <MdWavingHand />
          </div>}
        </div>
        <CreateMessage setMessages={setMessages} />        
      </div>
      }
    </div>
  )
};

export default JoinedRoom;