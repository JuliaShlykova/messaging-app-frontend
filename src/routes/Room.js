import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import JoinedRoom from '../components/JoinedRoom';
import UnjoinedRoom from '../components/UnjoinedRoom';

const UserRoom = () => {
  const {roomId} = useParams();
  const [response, setResponse] = useState({
    access: false,
    room: {
      name: 'Default',
      _id: '3',
      admin: {_id: '1', nickname: 'John Wick'},
      participants: [{_id: '2', nickname: 'Hugh Lori'}]
    }
  })

  return (<>
    {response.access
      ?<JoinedRoom />
      :<UnjoinedRoom name={response.room.name} admin={response.room.admin} participants={response.room.participants} />
    }
    </>)
}

export default UserRoom