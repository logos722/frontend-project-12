/* eslint-disable object-curly-newline */
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import profanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { sendRenameChannel } from '../helpers/socket.js';

const ModalRename = ({ show, handleClose, channelId, changeChannel }) => {
  const inputRef = useRef(null); // Создаем ref для элемента input
  const { t } = useTranslation();
  const [channelName, setChannelName] = useState(''); // Локальное состояние для имени канала
  const showConfirmNotification = () => {
    toast.success(t('channels.renamed'));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (show && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [show]);

  const handleRename = () => {
    showConfirmNotification();
    console.log(channelId);
    const filteredName = profanity.clean(channelName).trim();
    const newNameForChannel = { id: channelId, name: filteredName };
    console.log(newNameForChannel);
    sendRenameChannel(newNameForChannel, (acknowledgmentData) => {
      console.log('Подтверждение от сервера:', acknowledgmentData);
    });
    setChannelName('');
    handleClose();
    changeChannel(channelId);
  };

  const handleKeyPress = (e) => {
    console.log('User pressed: ', e.key);
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === ' ') {
      e.preventDefault(); // Предотвращаем стандартное поведение пробела
      setChannelName((prevName) => `${prevName} `); // Добавляем пробел к текущему значению
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              className="mb-2"
              ref={inputRef}
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              onKeyDown={handleKeyPress}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
            <div className="d-flex justify-content-end">
              <Button className="me-2" type="button" variant="secondary" onClick={handleClose}>
                {t('modals.cancel')}
              </Button>
              <Button variant="primary" onClick={handleRename}>
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRename;
