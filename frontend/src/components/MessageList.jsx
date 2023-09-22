import React from 'react';
import { useSelector } from 'react-redux';

import { selectors as MessageSelector } from '../slices/messagesSlice.js';

const MessageList = () => {
  const messages = useSelector(MessageSelector.selectAll);

  return (
    <div className="message-list">
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
