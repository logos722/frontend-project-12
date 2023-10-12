/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { sendRenameChannel } from '../helpers/socket.js';

const ModalRename = ({ show, handleClose, channelId, changeChannel }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const showConfirmNotification = () => {
    toast.success(t('channels.rename'));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (name) => {
      console.log(channelId);
      const newNameForChannel = { id: channelId, name };
      console.log(newNameForChannel);
      sendRenameChannel(newNameForChannel, (acknowledgmentData) => {
        console.log('Подтверждение от сервера:', acknowledgmentData);
      });
      showConfirmNotification();
      handleClose();
      changeChannel(channelId);
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>{t('modals.editChannelName')}</Form.Label>
            <Form.Control
              className="mb-2"
              ref={inputRef}
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
              id="name"
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name) || t(formik.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" type="button" variant="secondary" onClick={handleClose}>
                {t('modals.cancel')}
              </Button>
              <Button variant="primary" type="submit">
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
