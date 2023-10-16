import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { InputGroup, Form } from 'react-bootstrap';
import profanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useSocketContext, useAuthContext } from '../context/index.js';

import { selectors as ChannelSelectors } from '../slices/channelsSlice.js';
import { selectors as MessageSelector } from '../slices/messagesSlice.js';

const MessageList = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const [newMessageText, setNewMessageText] = useState('');
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(ChannelSelectors.selectAll);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const messages = useSelector(MessageSelector.selectAll);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const { addNewMessage } = useSocketContext();
  const useAuth = useAuthContext();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessageText.trim() === '') {
      return;
    }

    const resolve = () => {
      setNewMessageText('');
    };

    const filtered = profanity.clean(newMessageText);
    const { username } = useAuth.data;

    const msgData = { text: filtered, channelId: currentChannelId, username };

    addNewMessage(msgData, resolve);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p>
          <b>
            {currentChannel ? (currentChannel.name) : null}
          </b>
        </p>
        <span className="text-muted">{`${currentChannelMessages.length} ${t('chat.messageCount', { count: currentChannelMessages.length })}`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {currentChannelMessages
          ? (
            <ul style={{ listStyle: 'none' }}>
              {currentChannelMessages.map((message) => (
                <li key={message.id}>
                  <b>{message.username}</b>
                  :
                  {message.text}
                </li>
              ))}
            </ul>
          ) : null}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form
          className="py-1 rounded-2"
          noValidate
          onSubmit={handleSendMessage}
          style={{ border: '1px solid rgba(112, 110, 110, 0.4)' }}
        >
          <InputGroup className="has-validation">
            <Form.Control
              aria-label={t('chat.newMessage')}
              className="border-0 p-0 ps-2 bg-light"
              name="body"
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder={t('chat.newMessage')}
              ref={inputRef}
              value={newMessageText}
            />

            <button
              className="btn btn-group-vertical"
              disabled={newMessageText === ''}
              id="sendMessageButton"
              type="submit"
            >
              <svg
                fill="currentColor"
                height="20"
                viewBox="0 0 16 16"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  fillRule="evenodd"
                />
              </svg>

              <span className="visually-hidden">
                {t('chat.sendMessageButton')}
              </span>
            </button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default MessageList;
