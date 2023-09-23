import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const currentUser = localStorage.getItem('username');

const sendMessage = (message) => {
  socket.emit('newMessage', { body: message.text, channelId: 1, username: currentUser }, (acknowledgmentData) => {
    console.log('Сообщение успешно отправлено:', acknowledgmentData);
  });
};

export default sendMessage;
