import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getToken, getUser } from './services/localStorage';
import ChatsBar from './components/ChatsBar';
import DefaultPage from './routes/DefaultPage';
import Loading from './components/Loading';
import Room from './routes/Room';
import User from './routes/User';
import { useLoading } from './contexts/LoadingContext';
import CreateRoom from './routes/CreateRoom';
import { getUsers } from './api/users';
import socket from './socket';

function PrivateRoutes() {
  const [users, setUsers] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  
  const {loading} = useLoading();

  useEffect(() => {
    if (getToken()&&getUser()) {
      const fetchData = async() => {
        const usersToInvite = await getUsers();
        setUserAuthenticated(true);
        setUsers(usersToInvite);
      };
      fetchData().catch(err => {
        console.log(err);
      });
    }

    return () => {
      setUserAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (userAuthenticated) {
      socket.connect();
      socket.emit('login', getUser());
    }
  }, [userAuthenticated]);

  if (!getToken()||!getUser()) {
    console.log('no token for private route');
    return <Navigate to="/login" replace />
  };

  return (
    <>    
    {userAuthenticated
      ?<div className="private-pages">
      <Header />
      <ChatsBar users={users} setUsers={setUsers}/>
      <main>
      <Routes>
      <Route path="" element={<DefaultPage />} />
      <Route path="create-room" element={<CreateRoom users={users} />} />
      <Route path="users/:userNickname" element={<User />} />
      <Route path="rooms/:roomId" element={<Room />} />
      <Route path="*" element={<Navigate to='/not-found' replace />} />
      </Routes>
      </main>
      </div>
      :null}
    {loading?<Loading />:null}
    </>
  )
};

export default PrivateRoutes;