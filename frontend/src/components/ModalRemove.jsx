/* eslint-disable object-curly-newline */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSocketContext } from '../context/index.js';

const ModalRemove = ({ show, handleClose, channelId }) => {
  const { t } = useTranslation();
  const { removeChannel } = useSocketContext();
  const showConfirmNotification = () => {
    toast.success(t('channels.removed'));
  };

  const resolve = () => {
    showConfirmNotification();
    handleClose();
  };

  const handleSubmit = () => {
    console.log(channelId);
    const obj = { id: channelId };
    removeChannel(obj, resolve);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.confirmation')}
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={handleClose}>
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
