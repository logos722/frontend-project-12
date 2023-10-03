import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ModalAdd from './ModalAdd.jsx';
import ModalRemove from './ModalRemove.jsx';
import ModalRename from './ModalRename.jsx';
import { subscribeToNewChannel, subscribeToRemoveChannel, subscribeToRenameChannel } from '../helpers/socket.js';

import { selectors as ChannelSelectors, actions as channelActions } from '../slices/channelsSlice.js';

const ChannelList = () => {
  const channels = useSelector(ChannelSelectors.selectAll);
  const dispatch = useDispatch();
  const [showModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToNewChannel(dispatch, channelActions.addchannel);
    const unsubRenameChannel = subscribeToRenameChannel(dispatch, channelActions.renameChannel);
    const unsubRemoveChannel = subscribeToRemoveChannel(dispatch, channelActions.removeChannel);

    return () => {
      unsubscribe();
      unsubRenameChannel();
      unsubRemoveChannel(); // Очищаем подписку при размонтировании компонента
    };
  }, []);

  const changeChannel = (channelId) => {
    console.log(channelId);
    dispatch(channelActions.changeChannel(channelId));
  };

  const handleOpenModal = (type) => {
    type(true);
  };

  const handleCloseModal = (type) => {
    type(false);
  };

  return (
    <div className="channel-list">
      <div>
        <h2>Channels</h2>
        <button type="submit" onClick={() => handleOpenModal(setShowAddModal)}>Добавить канал</button>
        <ModalAdd
          show={showModal}
          handleClose={() => handleCloseModal(setShowAddModal)}
          changeChannel={changeChannel}
        />
      </div>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <Dropdown as={ButtonGroup}>
              <Button variant="Primary" type="submit" onClick={() => changeChannel(channel.id)}>{channel.name}</Button>

              <Dropdown.Toggle split variant="Primary" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Button variant="Primary" type="submit" onClick={() => handleOpenModal(setShowRenameModal)}>переименовать</Button>
                  <ModalRename
                    show={showRenameModal}
                    handleClose={() => handleCloseModal(setShowRenameModal)}
                    channelId={channel.id}
                    changeChannel={changeChannel}
                  />
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button variant="Primary" type="submit" onClick={() => handleOpenModal(setShowDeleteModal)}>удалить</Button>
                  <ModalRemove
                    show={showDeleteModal}
                    handleClose={() => handleCloseModal(setShowDeleteModal)}
                    channelId={channel.id}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
