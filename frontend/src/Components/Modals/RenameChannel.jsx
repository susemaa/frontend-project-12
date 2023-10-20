import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';
import { actions } from '../../slices/index.js';

const channelValidationSchema = (channelsNames) => yup.object().shape({
  name: yup.string()
    .trim()
    .required('New channel name is required')
    .min(3, 'Channel name must have at least 3 chars')
    .max(20, 'Channel name must have less than 20 chars ')
    .notOneOf(channelsNames),
});

const RemoveChannelModal = ({ onHide, modalInfo }) => {
  const { t } = useTranslation();
  const channelsNames = useSelector((s) => s.channelsInfo.channels).map((ch) => ch.name);
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { id } = modalInfo.channel;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      try {
        await socket.renameChannel({ name, id, removable: true });
        dispatch(actions.renameChannel(id, name));
        toast.success(t('toast.channelRename'));
        onHide();
        formik.values.name = '';
      } catch (err) {
        if (err.isAxiosError) {
          toast.error(t('toast.networkError'));
          return;
        }
        toast.error(t('toast.unknownError'));
      }
    },
    validationSchema: channelValidationSchema(channelsNames),
  });

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              placeholder={t('channels.channelsName')}
              ref={inputRef}
              required
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            <label htmlFor="name" className="visually-hidden">{t('channels.channelsName')}</label>
            <Form.Label visuallyHidden htmlFor="name">{t('channels.channelsName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={onHide} className="me-2">
                {t('buttons.cancel')}
              </Button>
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                {t('buttons.send')}
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default RemoveChannelModal;
