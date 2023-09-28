import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as ChannelActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ChannelActions.removeChannel, (state, { payload }) => {
        const channelIdToRemove = payload;
        const entities = Object.values(state.entities);
        const restEntities = entities.filter((entity) => entity.channelId !== channelIdToRemove);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
