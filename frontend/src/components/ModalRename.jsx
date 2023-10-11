/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { sendRenameChannel } from '../helpers/socket.js';

const ModalRename = ({ show, handleClose, channelId, changeChannel }) => {
  const { t } = useTranslation();
  const [channelName, setChannelName] = useState(''); // Локальное состояние для имени канала
  const showConfirmNotification = () => {
    toast.success(t('channels.renamed'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      theme: 'light',
    });
  };

  const handleRename = () => {
    showConfirmNotification();
    console.log(channelId);
    const newNameForChannel = { id: channelId, name: channelName };
    console.log(newNameForChannel);
    sendRenameChannel(newNameForChannel, (acknowledgmentData) => {
      console.log('Подтверждение от сервера:', acknowledgmentData);
    });
    setChannelName('');
    handleClose();
    changeChannel(channelId);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{t('modals.editChannelName')}</Form.Label>
            <Form.Control
              type="text"
              placeholder="test"
              autoFocus
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRename}>
          {t('modals.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRename;
