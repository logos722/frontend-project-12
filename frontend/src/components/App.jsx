import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import NF from './NotFound.jsx';
import Registration from './Registration.jsx';
import '../assets/application.scss';

const rollbarConfig = {
  accessToken: '3b1d63d048624d49ae9f3df814ad2af5',
  environment: 'testenv',
};

const App = () => {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NF />} />
            <Route path="/signup" element={<Registration />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};
export default App;
