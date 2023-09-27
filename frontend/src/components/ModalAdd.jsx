import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';

import { actions as ChannelActions } from '../slices/channelsSlice.js';

const ModalAdd = ({ show, handleClose, latestChannel }) => {
  const [channelName, setChannelName] = useState(''); // Локальное состояние для имени канала
  const dispatch = useDispatch();

  const handleSave = () => {
    // Выполните здесь логику сохранения нового канала
    // Используйте значение channelName для имени нового канала
    // Затем вызовите handleClose, чтобы закрыть модальное окно
    // Например, отправьте запрос на сервер для создания канала
    const newChannel = { id: latestChannel.id + 1, name: channelName, removable: false };
    dispatch(ChannelActions.addchannel(newChannel));

    // После успешного сохранения можно сбросить значение channelName
    setChannelName('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Название канала</Form.Label>
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
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdd;
