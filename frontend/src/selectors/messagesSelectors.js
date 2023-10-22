import { createSelector } from '@reduxjs/toolkit';
import { getCurrentChannelId } from './channelsSelectors';

const selectMessagesState = (state) => state.messages;

export const getAllMessages = createSelector(
  [selectMessagesState],
  (messages) => messages.ids.map((id) => messages.entities[id]),
);

export const getMessagesForCurrentChannel = createSelector(
  [selectMessagesState, getCurrentChannelId],
  (messages, currentChannelId) => messages.ids
    .filter((id) => messages.entities[id].channelId === currentChannelId)
    .map((id) => messages.entities[id]),
);
