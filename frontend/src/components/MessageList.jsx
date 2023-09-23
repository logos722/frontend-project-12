import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import sendMessage from '../helpers/socket.js';

import { selectors as MessageSelector } from '../slices/messagesSlice.js';

const MessageList = () => {
  const [newMessageText, setNewMessageText] = useState('');
  const messages = useSelector(MessageSelector.selectAll);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessageText.trim() === '') {
      return; // Не отправляем пустые сообщения
    }

    const messageData = { text: newMessageText };

    sendMessage(messageData, (acknowledgmentData) => {
      console.log('Подтверждение от сервера:', acknowledgmentData);
      // После отправки сообщения можно обновить состояние или очистить поле ввода
      setNewMessageText('');
    });
  };

  return (
    <div className="message-list">
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
        <input onSubmit={sendMessage} type="text" />
      </ul>
    </div>
  );
};

export default MessageList;
