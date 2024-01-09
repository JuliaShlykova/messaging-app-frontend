import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Login from './routes/Login';
import Signup from './routes/Signup';
import NotFound from './routes/NotFound';
import Loading from './components/Loading';
import LoadingProvider from './contexts/LoadingContext';
import ServerError from './routes/ServerError';

function App() {
  return (
    <>
      <LoadingProvider>
      <Routes>        
        <Route path='/loading' element={<Loading />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/server-error" element={<ServerError/>} />
        <Route path='/*' element={<PrivateRoutes />} />
      </Routes>
      </LoadingProvider>
    </>
  );
}

export default App;
