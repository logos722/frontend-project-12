import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
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

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NF />} />
            <Route path="/signup" element={<Registration />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

export default App;
