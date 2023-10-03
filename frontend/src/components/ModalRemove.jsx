/* eslint-disable object-curly-newline */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { sendRemoveChannel } from '../helpers/socket.js';

const ModalRemove = ({ show, handleClose, channelId }) => {
  const handleSubmit = () => {
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
        <Modal.Title>Удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы точно хотите удалить канал?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemove;
