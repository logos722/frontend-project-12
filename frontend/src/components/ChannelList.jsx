import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalAdd from './ModalAdd.jsx';
import { subscribeToNewChannel } from '../helpers/socket.js';

import { selectors as ChannelSelectors, actions as channelActions } from '../slices/channelsSlice.js';

const ChannelList = () => {
  const channels = useSelector(ChannelSelectors.selectAll);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToNewChannel(dispatch, channelActions.addchannel);

    return () => {
      unsubscribe(); // Очищаем подписку при размонтировании компонента
    };
  }, [dispatch]);

  const changeChannel = (channelId) => {
    dispatch(channelActions.changeChannel(channelId));
  };

  const handleOpenModal = () => {
    console.log(channels);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="channel-list">
      <div>
        <h2>Channels</h2>
        <button type="submit" onClick={handleOpenModal}>Добавить канал</button>
        <ModalAdd show={showModal} handleClose={handleCloseModal} changeChannel={changeChannel} />
      </div>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <button type="submit" onClick={() => changeChannel(channel.id)}>{channel.name}</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
