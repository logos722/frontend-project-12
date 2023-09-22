import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
  },
});

export default store;
