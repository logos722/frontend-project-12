import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import routes from '../routes.js';
import Home from './Home.jsx';
import SpinnerComponent from './Spinner.jsx';

const Checker = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { getAuthHeader, logOut } = useAuth();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const disconnect = useCallback(() => {
    logOut();
    navigate(routes.registrationPagePath());
  }, [logOut, navigate]);

  async function fetchData(header) {
    try {
      setLoad(false);
      const allData = await axios.get(routes.dataPath(), {
        headers: header,
      }).then((response) => (response.data));
      const channelsData = allData.channels;
      const messagesData = allData.messages;
      dispatch(channelsActions.addchannels(channelsData));
      dispatch(messagesActions.addMessages(messagesData));
      setLoad(true);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        disconnect();
        return;
      }
      toast.error(t('errors.network'), {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }

  useEffect(() => {
    const header = getAuthHeader();
    fetchData(header);
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
