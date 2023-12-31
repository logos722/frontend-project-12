import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import { getCurrentChannelId, selectAllChannels } from '../selectors/channelsSelectors.js';

import { actions as modalActions } from '../slices/modalSlice.js';

import { actions as channelActions } from '../slices/channelsSlice.js';

const ChannelList = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(getCurrentChannelId);
  const channels = useSelector(selectAllChannels);
  const dispatch = useDispatch();

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={() => dispatch(modalActions.openModalWindow({ type: 'addingChannel', item: null }))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 h-100 d-block"
      >
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable ? (
              <Dropdown className="d-flex w-90" as={ButtonGroup}>
                <Button active={currentChannelId === channel.id} variant="light" className="w-100 rounded-0 text-start text-truncate btn" type="submit" onClick={() => dispatch(channelActions.changeChannel(channel.id))}>
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle className="flex-grow-0" split variant="light" id="dropdown-split-basic">
                  <span className="visually-hidden">{t('channels.menu')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dispatch(modalActions.openModalWindow({
                    type: 'renameChannel',
                    item: channel,
                  }))}
                  >
                    {t('channels.rename')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(modalActions.openModalWindow({
                    type: 'removeChannel',
                    item: channel,
                  }))}
                  >
                    {t('channels.remove')}
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                type="button"
                active={currentChannelId === channel.id}
                variant="light"
                key={channel.id}
                className="w-100 rounded-0 text-start"
                onClick={() => dispatch(channelActions.changeChannel(channel.id))}
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
