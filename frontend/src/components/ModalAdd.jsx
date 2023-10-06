import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { sendChannel } from '../helpers/socket.js';

const ModalAdd = ({ show, handleClose, changeChannel }) => {
  const { t } = useTranslation();
  const [channelName, setChannelName] = useState(''); // Локальное состояние для имени канала
  const [newChannelID, setChannelID] = useState(null); // Локальное состояние для имени канала

  const handleSave = () => {
    // Выполните здесь логику сохранения нового канала
    // Используйте значение channelName для имени нового канала
    // Затем вызовите handleClose, чтобы закрыть модальное окно
    // Например, отправьте запрос на сервер для создания канала
    const resultName = `# ${channelName}`;
    // const newChannel = { id: latestChannel.id + 1, name: resultName, removable: false };
    const newChannel = { name: resultName };
    sendChannel(newChannel, (acknowledgmentData) => {
      console.log('Подтверждение от сервера:', acknowledgmentData);
      setChannelID(acknowledgmentData.data.id);
      // После отправки сообщения можно обновить состояние или очистить поле ввода
    });
    setChannelName('');
    handleClose();
    changeChannel(newChannelID);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{t('modals.channelName')}</Form.Label>
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
        <Button variant="primary" onClick={handleSave}>
          {t('modals.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdd;
