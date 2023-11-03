/* eslint-disable object-curly-newline */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../hooks';

import { getModalItem } from '../../selectors/modalsSelectors.js';
import { selectAllChannels } from '../../selectors/channelsSelectors.js';
import { actions as channelActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalSlice.js';

const ModalRename = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectAllChannels);
  const channelBeingEdited = useSelector(getModalItem);
  const [channelName, setChannelName] = useState(''); // Локальное состояние для имени канала
  const [showAlert, setShowAlert] = useState(false); // Локальное состояние для имени канала
  const { t } = useTranslation();
  const { renameChannelName } = useApi();

  const showConfirmNotification = () => {
    toast.success(t('channels.renamed'));
  };

  const inputRef = useRef(); // Создаем ref для элемента input

  useEffect(() => {
    setChannelName(channelBeingEdited.name);
    inputRef.current.focus();
  }, []);

  const resolve = (id) => {
    showConfirmNotification();
    setChannelName('');
    dispatch(channelActions.changeChannel(id));
    dispatch(modalActions.closeModalWindow());
  };

  const handleRename = async () => {
    if (channels.find((channel) => channel.name === channelName)) {
      setShowAlert(true);
    } else {
      const newNameForChannel = { id: channelBeingEdited.id, name: channelName };
      await renameChannelName(newNameForChannel, resolve);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRename();
    } else if (e.key === ' ') {
      e.preventDefault();
      setChannelName((prevName) => `${prevName} `);
    }
  };

  return (
    <Modal onHide={() => dispatch(modalActions.closeModalWindow())} show>
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
              <Button className="me-2" type="button" variant="secondary" onClick={() => dispatch(modalActions.closeModalWindow())}>
                {t('modals.cancel')}
              </Button>
              <Button variant="primary" onClick={handleRename}>
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {showAlert && (
          <Alert className="w-100" variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <p>
              {t('modals.uniq')}
            </p>
          </Alert>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRename;
