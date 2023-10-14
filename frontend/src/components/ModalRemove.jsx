/* eslint-disable object-curly-newline */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { sendRemoveChannel } from '../helpers/socket.js';

const ModalRemove = ({ show, handleClose, channelId }) => {
  const { t } = useTranslation();
  const showConfirmNotification = () => {
    toast.success(t('channels.removed'));
  };

  const handleSubmit = () => {
    console.log(channelId);
    const obj = { id: channelId };
    sendRemoveChannel(obj, (acknowledgmentData) => {
      console.log('Подтверждение от сервера:', acknowledgmentData);
    });
    showConfirmNotification();
    handleClose();
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
