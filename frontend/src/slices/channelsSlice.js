import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// BEGIN (write your solution here)
const channelsAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addUser: channelsAdapter.addOne,
    addUsers: channelsAdapter.addMany,
  },
});

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
