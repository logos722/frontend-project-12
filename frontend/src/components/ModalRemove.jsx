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
    showConfirmNotification();
    console.log(channelId);
    const obj = { id: channelId };
    sendRemoveChannel(obj, (acknowledgmentData) => {
      console.log('Подтверждение от сервера:', acknowledgmentData);
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" onClick={handleClose}>
            {t('modals.cancel')}
          </Button>
          <Button type="button" variant="danger" onClick={handleSubmit}>
            {t('modals.submit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemove;
