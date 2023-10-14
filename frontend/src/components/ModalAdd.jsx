import React, { useState } from 'react';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { sendChannel } from '../helpers/socket.js';

const ModalAdd = ({ show, handleClose, changeChannel }) => {
  const { t } = useTranslation();
  const [newChannelID, setChannelID] = useState(null); // Локальное состояние для имени канала
  const showConfirmNotification = () => {
    toast.success(t('channels.created'));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      const filteredName = leoProfanity.clean(name);
      const newChannel = { name: filteredName };
      sendChannel(newChannel, (acknowledgmentData) => {
        console.log('Подтверждение от сервера:', acknowledgmentData);
        setChannelID(acknowledgmentData.data.id);
        // После отправки сообщения можно обновить состояние или очистить поле ввода
      });
      showConfirmNotification();
      handleClose();
      changeChannel(newChannelID);
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>{t('modals.channelName')}</Form.Label>
            <Form.Control
              className="mb-2"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={(formik.errors.name && formik.touched.name) || !!formik.status}
              name="name"
              id="name"
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name) || t(formik.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
