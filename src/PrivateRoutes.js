import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getToken, clearStorage, getUser } from './services/localStorage';
import ChatsBar from './components/ChatsBar';
import DefaultPage from './routes/DefaultPage';
import Loading from './components/Loading';
import Room from './routes/Room';
import User from './routes/User';
import { useLoading } from './contexts/LoadingContext';
import CreateRoom from './routes/CreateRoom';
import { getUsers } from './api/users';

function PrivateRoutes() {
  const {loading} = useLoading();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (getToken()&&getUser()) {
      const fetchData = async() => {
        const usersToInvite = await getUsers();
        setUsers(usersToInvite);
      };
      fetchData().catch(err => {
        console.log(err);
      });
    }
  }, []);

  if (!getToken()||!getUser()) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
    <div className="private-pages">
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
    {loading?<Loading />:null}
    </>
  )
}

export default PrivateRoutes;