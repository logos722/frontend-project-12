import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSocketContext } from '../../context/index.js';

import { selectAllChannels } from '../../selectors/channelsSelectors.js';
import { actions as channelActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalSlice.js';

const ModalAdd = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectAllChannels);
  const channelsNames = channels.map((channel) => channel.name);
  const { addNewChannel } = useSocketContext();
  const showConfirmNotification = () => {
    toast.success(t('channels.created'));
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('modals.required'))
        .notOneOf(channelsNames, t('modals.uniq'))
        .min(3, t('modals.min'))
        .max(20, t('modals.max')),
    }),

    onSubmit: async ({ name }) => {
      const resolve = (id) => {
        formik.resetForm();
        showConfirmNotification();
        dispatch(channelActions.changeChannel(id));
        dispatch(modalActions.closeModalWindow());
      };
      const filteredName = leoProfanity.clean(name);
      const newChannel = { name: filteredName };
      addNewChannel(newChannel, resolve);
    },
  });

  return (
    <Modal onHide={() => dispatch(modalActions.closeModalWindow())} show>
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
              isInvalid={formik.errors.name && formik.touched.name}
              ref={inputRef}
              name="name"
              id="name"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={() => dispatch(modalActions.closeModalWindow())}
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
