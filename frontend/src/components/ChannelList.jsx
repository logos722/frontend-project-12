import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ModalAdd from './ModalAdd.jsx';
import ModalRemove from './ModalRemove.jsx';
import ModalRename from './ModalRename.jsx';
import { subscribeToNewChannel, subscribeToRemoveChannel, subscribeToRenameChannel } from '../helpers/socket.js';

import { selectors as ChannelSelectors, actions as channelActions } from '../slices/channelsSlice.js';

const ChannelList = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCurrent = (id) => id === currentChannelId;
  function variant(id) { return isCurrent(id) ? 'secondary' : null; }

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
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={() => handleOpenModal(setShowAddModal)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
        <ModalAdd
          show={showModal}
          handleClose={() => handleCloseModal(setShowAddModal)}
          changeChannel={changeChannel}
        />
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable ? (
              <Dropdown className="d-flex" as={ButtonGroup}>
                <Button variant={variant(channel.id)} className="w-100 rounded-0 text-start text-truncate btn" type="submit" onClick={() => changeChannel(channel.id)}># {channel.name}</Button>
                <Dropdown.Toggle className="flex-grow-0" split variant={variant(channel.id)} id="dropdown-split-basic">
                  <span className="visually-hidden">{t('channels.menu')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Button variant={variant(channel.id)} type="submit" onClick={() => handleOpenModal(setShowRenameModal)}>{t('modals.rename')}</Button>
                    <ModalRename
                      show={showRenameModal}
                      handleClose={() => handleCloseModal(setShowRenameModal)}
                      channelId={channel.id}
                      changeChannel={changeChannel}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button variant={variant(channel.id)} type="submit" onClick={() => handleOpenModal(setShowDeleteModal)}>{t('modals.remove')}</Button>
                    <ModalRemove
                      show={showDeleteModal}
                      handleClose={() => handleCloseModal(setShowDeleteModal)}
                      channelId={channel.id}
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                type="button"
                variant={variant(channel.id)}
                key={channel.id}
                className="w-100 rounded-0 text-start"
                onClick={() => changeChannel(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelList;
