/* eslint-disable no-undef */
import io from 'socket.io-client';

const socket = io();

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

const sendRenameChannel = (channel) => {
  socket.emit('renameChannel', channel, (acknowledgmentData) => {
    console.log('Канал успешно переименован:', acknowledgmentData);
  });
};

const subscribeToRenameChannel = (dispatch, action) => {
  socket.on('renameChannel', (channel) => {
    const data = { id: channel.id, changes: channel };
    dispatch(action(data));
  });

  return () => {
    socket.off('renameChannel');
  };
};

const sendRemoveChannel = (id) => {
  socket.emit('removeChannel', id, (acknowledgmentData) => {
    console.log('Канал успешно удалён:', acknowledgmentData);
  });
};

const subscribeToRemoveChannel = (dispatch, action) => {
  socket.on('removeChannel', (channel) => {
    dispatch(action(channel.id));
  });

  return () => {
    socket.off('removeChannel');
  };
};

const sendChannel = (channel) => {
  socket.emit('newChannel', channel, (acknowledgmentData) => {
    console.log('Канал успешно добавлен:', acknowledgmentData);
  });
};

const subscribeToNewChannel = (dispatch, action) => {
  socket.on('newChannel', (channel) => {
    dispatch(action(channel));
  });

  return () => {
    socket.off('newChannel');
  };
};

const unsubscribe = (event) => {
  socket.off(event);
};

export {
  sendMessage, subscribeToNewMessages,
  subscribeToNewChannel, sendChannel,
  subscribeToRenameChannel, sendRenameChannel,
  subscribeToRemoveChannel, sendRemoveChannel,
  unsubscribe,
};
