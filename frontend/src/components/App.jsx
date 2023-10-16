import {
  BrowserRouter, Navigate, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar.jsx';
import Checker from './Checker.jsx';
import Login from './Login.jsx';
import NF from './NotFound.jsx';
import Registration from './Registration.jsx';
import MainProvider from '../context/MainProvider.jsx';
import { useAuthContext } from '../context/index.js';
import '../assets/application.scss';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? <Navigate to="/" /> : children;
};

const App = () => (
  <MainProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route exact path="/" element={(<PrivateRoute><Checker /></PrivateRoute>)} />
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Registration /></AuthRoute>} />
          <Route path="*" element={<NF />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </MainProvider>
);

export default App;
