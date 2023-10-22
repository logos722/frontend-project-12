import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
    modal: modalReducer,
  },
});

export default store;
