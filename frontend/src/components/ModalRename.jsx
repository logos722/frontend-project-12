/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { sendRenameChannel } from '../helpers/socket.js';

const ModalRename = ({ show, handleClose, channelId, changeChannel }) => {
  const [channelName, setChannelName] = useState(''); // Локальное состояние для имени канала

  const handleRename = () => {
    console.log(channelId);
    const resultName = `# ${channelName}`;
    const newNameForChannel = { id: channelId, name: resultName };
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Новое название канала</Form.Label>
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
          Close
        </Button>
        <Button variant="primary" onClick={handleRename}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRename;
