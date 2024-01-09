import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import JoinedRoom from '../components/JoinedRoom';
import UnjoinedRoom from '../components/UnjoinedRoom';
import { getRoom } from '../api/rooms';
import { useLoading } from '../contexts/LoadingContext';

const UserRoom = () => {
  const {roomId} = useParams();
  const [response, setResponse] = useState(null);

  const {toggleLoading} = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    toggleLoading();
    getRoom(roomId).then(rsp => {
      setResponse(rsp);
    }).catch(err => {
      console.log(err);
      navigate('/not-found', {replace: true});
    }).finally(() => {
      toggleLoading();
    })
  }, [roomId, toggleLoading, navigate]);

  return (<>
  {response
    ?(response.access
      ?<JoinedRoom privateRoom={response.room.private} name={response.room.name} admin={response.room.admin} participants={response.room.participants} messages={response.messages} />
      :<UnjoinedRoom name={response.room.name} admin={response.room.admin} participants={response.room.participants} />
    )
    :null}
    </>)
}

export default UserRoom