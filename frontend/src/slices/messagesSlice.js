import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// BEGIN (write your solution here)
const messagesAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
});

export const { actions } = messagesSlice;

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
