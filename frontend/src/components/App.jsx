import {
  useMemo, useCallback, useState, useEffect,
} from 'react';
import {
  BrowserRouter, Navigate, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar.jsx';
import Checker from './Checker.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Registration from './Registration.jsx';
import ModalWindow from './modal/ModalWindow.jsx';
import { SocketContext, AuthContext } from '../context/index.js';
import { useAuth } from '../hooks';
import routes from '../routes.js';
import '../assets/application.scss';

const ChatSocketProvider = ({ children, socket }) => {
  const addNewMessage = useCallback((props, resolve) => {
    socket.emit('newMessage', props, ({ status }) => {
      if (status) {
        resolve();
      }
    });
  }, [socket]);

  const addNewChannel = useCallback((props, resolve) => {
    socket.emit('newChannel', props, ({ status, data }) => {
      if (status) {
        resolve(data.id);
      }
    });
  }, [socket]);

  const removeChannel = useCallback((props, resolve) => {
    socket.emit('removeChannel', props, ({ status }) => {
      if (status) {
        resolve();
      }
    });
  }, [socket]);

  const renameChannelName = useCallback((props, resolve) => {
    socket.emit('renameChannel', props, ({ status }) => {
      if (status) {
        resolve(props.id);
      }
    });
  }, [socket]);

  const socketContextValue = useMemo(() => ({
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannelName,
  }), [addNewMessage, addNewChannel, removeChannel, renameChannelName]);

  return (
    <SocketContext.Provider
      value={socketContextValue}
    >
      {children}
    </SocketContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const getUserName = useCallback(() => {
    const { username } = JSON.parse(localStorage.getItem('user'));
    return username;
  }, []);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  }, []);

  const providedData = useMemo(
    () => ({
      getUserName,
      logIn,
      logOut,
      getAuthHeader,
      user,
    }),
    [getUserName, logIn, logOut, getAuthHeader, user],
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      // обработка изменений в localstorage
      if (event.newValue == null) {
        window.location.href = routes.loginPagePath();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [logOut]);

  return (
    <AuthContext.Provider
      value={providedData}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to={routes.loginPagePath()} />;
};

const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to={routes.chatPagePath()} /> : children;
};

const App = ({ socket }) => (
  <AuthProvider>
    <ChatSocketProvider socket={socket}>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Navbar />
          <Routes>
            <Route
              exact
              path={routes.chatPagePath()}
              element={(<PrivateRoute><Checker /></PrivateRoute>)}
            />
            <Route path={routes.loginPagePath()} element={<AuthRoute><Login /></AuthRoute>} />
            <Route
              path={routes.registrationPagePath()}
              element={<AuthRoute><Registration /></AuthRoute>}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ModalWindow />
        </div>
        <ToastContainer />
      </BrowserRouter>
    </ChatSocketProvider>
  </AuthProvider>
);

export default App;
