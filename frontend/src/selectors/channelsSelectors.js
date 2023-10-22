import { createSelector } from '@reduxjs/toolkit';

const selectChannelsState = (state) => state.channels;

export const getCurrentChannelId = createSelector(
  [selectChannelsState],
  (channels) => channels.currentChannelId,
);

export const selectAllChannels = createSelector(
  [selectChannelsState],
  (channels) => channels.ids.map((id) => channels.entities[id]),
);
