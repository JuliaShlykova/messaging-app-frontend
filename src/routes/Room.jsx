import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JoinedRoom from '../components/JoinedRoom';
import UnjoinedRoom from '../components/UnjoinedRoom';
import { getRoom } from '../api/rooms';
import { useLoading } from '../contexts/LoadingContext';

const UserRoom = () => {
  const {roomId} = useParams();
  const [access, setAccess] = useState(false);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const {toggleLoading} = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    toggleLoading();
    getRoom(roomId).then(rsp => {
      setAccess(rsp.access);
      setRoom(rsp.room);
      if (rsp.messages) setMessages(rsp.messages);
    }).catch(err => {
      if (err.message !== 'no token') {
        navigate('/not-found', {replace: true});
      }
    }).finally(() => {
      toggleLoading();
    })

    return () => {
      setRoom(null);
      setMessages([]);
    }
  }, [roomId, toggleLoading, navigate]);

  if (!room) {
    return null
  };

  return (<>
    {
    access
    ?<JoinedRoom 
      privateRoom={room.private} 
      name={room.name} admin={room.admin} 
      participants={room.participants} 
      roomImgUrl={room.roomImgUrl}
      messages={messages} 
      setMessages={setMessages}
      setRoom={setRoom}
      />
    :<UnjoinedRoom 
      name={room.name} 
      admin={room.admin} 
      participants={room.participants}
      roomImgUrl={room.roomImgUrl}
      />
    }
    </>)
};

export default UserRoom;