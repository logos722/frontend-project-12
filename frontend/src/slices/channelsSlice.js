/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();
initialState.currentChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    // renameChannel2: (state, {payload}) => {
    //   state.channels.entities.f
    // },
    addchannel: channelsAdapter.addOne,
    addchannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: (state, { payload }) => {
      console.log(payload);
      if (state.currentChannelId === payload) {
        state.currentChannelId = 1;
      }
      console.log(state);
      channelsAdapter.removeOne(state, payload);
      console.log(state.channels);
    },
  },
});

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
