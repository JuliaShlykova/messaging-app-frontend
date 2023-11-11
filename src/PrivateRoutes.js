import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
// import Friends from './routes/Friends';
// import Posts from './routes/Posts';
// import ProfileRoute from './routes/ProfileRoute';
import { useEffect } from 'react';
import { getToken, clearStorage } from './services/localStorage';
import ChatsBar from './components/ChatsBar';
import DefaultPage from './routes/DefaultPage';
import CreateChat from './components/CreateChat';
import Room from './routes/Room';
import OtherRoom from './routes/OtherRoom';
import User from './routes/User';

function PrivateRoutes() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!getToken()) {
  //     clearStorage();
  //     navigate('/login');
  //   }
  // })

  return (
    <div className="private-pages">
    <Header />
    <ChatsBar />
    <main>
    <Routes>
    {/* <Route path="friends" element={<Friends />} /> */}
    <Route path="" element={<DefaultPage />} />
    {/* <Route path=":userId/profile" element={<ProfileRoute/>} /> */}
    <Route path="users/:userNickname" element={<User />} />
    <Route path="other-rooms/:roomId" element={<OtherRoom />} />
    <Route path="rooms/:roomId" element={<Room />} />
    <Route path="*" element={<Navigate to='/not-found' replace />} />
    </Routes>
    </main>
    </div>
  )
}

export default PrivateRoutes;