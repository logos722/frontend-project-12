import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import Home from './Home.jsx';
import SpinnerComponent from './Spinner.jsx';

const Checker = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useAuthContext();
  const useAuth = useAuthContext();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const disconnect = useCallback(() => {
    localStorage.clear();
    useAuth.setUserData(null);
    navigate('/signup');
  }, [useAuth, navigate]);

  async function fetchData(token) {
    try {
      setLoad(false);
      // Загрузка каналов и сообщений с сервера (axios, fetch и т.д.)
      const allData = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => (response.data));
      const channelsData = allData.channels;
      const messagesData = allData.messages;
      console.log(channelsData);
      console.log(messagesData);
      console.log(channelsActions);
      console.log(messagesActions);

      // Сохранение данных в Redux
      dispatch(channelsActions.addchannels(channelsData));
      dispatch(messagesActions.addMessages(messagesData));
      setLoad(true);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        disconnect();
        return;
      }
      // Отображение уведомления с текстом ошибки
      toast.error(t('errors.network'), {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }

  useEffect(() => {
    const { token } = data;
    fetchData(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {load ? null : <SpinnerComponent />}
      <Home />
    </>
  );
};

export default Checker;
