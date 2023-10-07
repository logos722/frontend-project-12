import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home.jsx';
import Login from './Login.jsx';
import NF from './NotFound.jsx';
import Registration from './Registration.jsx';
import '../assets/application.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NF />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};
export default App;
