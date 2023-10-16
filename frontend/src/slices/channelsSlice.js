/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();
initialState.currentChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addchannel: channelsAdapter.addOne,
    addchannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    changeChannel: (state, { payload }) => {
      console.log(`reducer works ${payload}`);
      state.currentChannelId = payload;
      console.log(`state after ${state.currentChannelId}`);
    },
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = 1;
      }
      channelsAdapter.removeOne(state, payload);
    },
  },
});

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
