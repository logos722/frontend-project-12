/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSocketContext } from '../../context/index.js';

import { actions as modalActions } from '../../slices/modalSlice.js';
import { getModalItem } from '../../selectors/modalsSelectors.js';

const ModalRemove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(false);
  const { removeChannel } = useSocketContext();
  const channelBeingEdited = useSelector(getModalItem);
  const showConfirmNotification = () => {
    toast.success(t('channels.removed'));
  };

  const resolve = () => {
    showConfirmNotification();
    dispatch(modalActions.closeModalWindow());
  };

  const handleSubmit = () => {
    setDisabled(true);
    removeChannel(channelBeingEdited, resolve);
    setDisabled(false);
  };

  return (
    <Modal onHide={() => dispatch(modalActions.closeModalWindow())} show>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.confirmation')}
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" disabled={isDisabled} variant="secondary" onClick={() => dispatch(modalActions.closeModalWindow())}>
          {t('modals.cancel')}
        </Button>
        <Button type="button" variant="danger" onClick={handleSubmit}>
          {t('modals.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemove;
