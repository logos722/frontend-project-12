import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
// import Spinner from 'react-bootstrap/Spinner';
import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
// import routes from '../routes.js';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // Проверка наличия токена в localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        // Если токена нет, перенаправляем пользователя на страницу входа
        navigate('/login');
      }

      try {
        // Загрузка каналов и сообщений с сервера (axios, fetch и т.д.)
        const allData = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          return response.data; // => { channels: [...], currentChannelId: 1, messages: [] }
        });
        const channelsData = allData.channels;
        const messagesData = allData.messages;
        console.log(channelsData);
        console.log(messagesData);
        console.log(channelsActions);
        console.log(messagesActions);

        // Сохранение данных в Redux
        dispatch(channelsActions.addchannels(channelsData));
        dispatch(messagesActions.addMessages(messagesData));
      } catch (error) {
        console.error(error);

        // Отображение уведомления с текстом ошибки
        toast.error(t('errors.network'), {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelList />
        </div>
        <div className="col p-0 h-100">
          <MessageList />
        </div>
      </div>
    </div>
  );
};

export default Home;
