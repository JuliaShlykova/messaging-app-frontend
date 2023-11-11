import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Login from './routes/Login';
import Signup from './routes/Signup';
import NotFound from './routes/NotFound';
import Loading from './components/Loading';

function App() {
  return (
    <>
      <Routes>
        
        <Route path='/loading' element={<Loading />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path='/*' element={<PrivateRoutes />} />
      </Routes>
    </>
  );
}

export default App;
