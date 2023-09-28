/* eslint-disable no-undef */
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const sendMessage = (message) => {
  socket.emit('newMessage', message, (acknowledgmentData) => {
    console.log('Сообщение успешно отправлено:', acknowledgmentData);
  });
};

const subscribeToNewMessages = (dispatch, action) => {
  socket.on('newMessage', (message) => {
    dispatch(action(message));
  });

  return () => {
    socket.off('newMessage');
  };
};

const subscribeToNewChannel = (dispatch, action) => {
  socket.on('newChannel', (channel) => {
    dispatch(action(channel));
  });

  return () => {
    socket.off('newChannel');
  };
};

const sendChannel = (channel) => {
  socket.emit('newChannel', channel, (acknowledgmentData) => {
    console.log('Канал успешно добавлен:', acknowledgmentData);
  });
};

const unsubscribe = (event) => {
  socket.off(event);
};

export {
  sendMessage, subscribeToNewMessages, subscribeToNewChannel, sendChannel, unsubscribe,
};
