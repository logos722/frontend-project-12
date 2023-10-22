import { createSelector } from '@reduxjs/toolkit';

const selectModalsState = (state) => state.modal;

const getModalType = createSelector(
  [selectModalsState],
  (modal) => modal.type,
);

const getModalItem = createSelector(
  [selectModalsState],
  (modal) => modal.item,
);

export { getModalType, getModalItem };
