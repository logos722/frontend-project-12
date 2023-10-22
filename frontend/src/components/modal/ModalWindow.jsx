/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './ModalAdd.jsx';
import RenameChannel from './ModalRename.jsx';
import RemoveChannel from './ModalRemove.jsx';
import { getModalType } from '../../selectors/modalsSelectors.js';

const modals = {
  addingChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

const ModalWindow = () => {
  const modalType = useSelector(getModalType);
  const Modal = modals[modalType];

  return (
    <>
      {Modal ? <Modal /> : null}
    </>
  );
};

export default ModalWindow;
