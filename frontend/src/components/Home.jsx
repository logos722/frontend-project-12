import { loremIpsum } from 'lorem-ipsum';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import Spinner from 'react-bootstrap/Spinner';
import ChannelsBox from './ChannelsBox.jsx';
import ChatBox from './ChatBox.jsx';
import Modal from './Modal.jsx';
import { actions } from '../slices/index.js';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка наличия токена в localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Если токена нет, перенаправляем пользователя на страницу входа
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Modal />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
