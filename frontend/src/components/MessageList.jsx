import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, subscribeToNewMessages } from '../helpers/socket.js';

import { selectors as MessageSelector, actions as messagesActions } from '../slices/messagesSlice.js';

const MessageList = () => {
  const [newMessageText, setNewMessageText] = useState('');
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector(MessageSelector.selectAll);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = subscribeToNewMessages(dispatch, messagesActions.addMessage);

    return () => {
      unsubscribe(); // Очищаем подписку при размонтировании компонента
    };
  }, [dispatch]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessageText.trim() === '') {
      return; // Не отправляем пустые сообщения
    }

    const currentUser = localStorage.getItem('username');

    const msgData = { text: newMessageText, channelId: currentChannelId, username: currentUser };

    sendMessage(msgData, (acknowledgmentData) => {
      console.log('Подтверждение от сервера:', acknowledgmentData);
      // После отправки сообщения можно обновить состояние или очистить поле ввода
    });
    setNewMessageText('');
  };
  console.log(currentChannelId);
  return (
    <div className="message-list">
      <h2>Messages</h2>
      <h3>Текущий канал: </h3>
      {currentChannelMessages
        ? (
          <ul>
            {currentChannelMessages.map((message) => (
              <li key={message.id}>{message.username}: {message.text}</li>
            ))}
          </ul>
        ) : null}
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Введите ваше сообщение..."
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default MessageList;
