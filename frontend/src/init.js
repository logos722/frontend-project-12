import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import profanity from 'leo-profanity';

import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { SocketContext } from './context/index.js';
import { actions as channelActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import store from './slices/store.js';

import App from './components/App.jsx';

import resources from './locales/index.js';
import badWord from './locales/badWord.js';

const RunApp = async () => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  socket.on('renameChannel', (payload) => {
    const data = { id: payload.id, changes: payload };
    store.dispatch(channelActions.renameChannel(data));
  });

  socket.on('removeChannel', (channel) => {
    store.dispatch(channelActions.removeChannel(channel.id));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelActions.addchannel(payload));
  });

  const addNewMessage = (props, resolve) => {
    socket.emit('newMessage', props, ({ status }) => {
      if (status) {
        resolve();
      }
    });
  };

  const addNewChannel = (props, resolve) => {
    socket.emit('newChannel', props, ({ status, data }) => {
      if (status) {
        resolve(data.id);
      }
    });
  };

  const removeChannel = (props, resolve) => {
    socket.emit('removeChannel', props, ({ status }) => {
      if (status) {
        resolve();
      }
    });
  };

  const renameChannelName = (props, resolve) => {
    socket.emit('renameChannel', props, ({ status }) => {
      if (status) {
        resolve(props.id);
      }
    });
  };

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  profanity.add(profanity.getDictionary('en'));
  const russianDictionary = profanity.getDictionary('ru');
  profanity.add(russianDictionary);
  profanity.add(badWord);

  const rollbarConfig = {
    enabled: true,
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'testenv',
  };

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
              <SocketContext.Provider
                value={{
                  addNewMessage,
                  addNewChannel,
                  removeChannel,
                  renameChannelName,
                }}
              >
                <App />
              </SocketContext.Provider>
            </I18nextProvider>
          </ErrorBoundary>
        </RollbarProvider>
      </Provider>
    </React.StrictMode>,
  );
};

export default RunApp;
