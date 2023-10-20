import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';
import { actions } from '../../slices/index.js';

const channelValidationSchema = (channelsNames, t) => yup.object().shape({
  name: yup.string()
    .trim()
    .required(t('validation.required'))
    .min(3, t('validation.min'))
    .max(20, t('validation.max'))
    .notOneOf(channelsNames),
});

const AddChannelModal = ({ onHide }) => {
  const { t } = useTranslation();
  const channelsNames = useSelector((s) => s.channelsInfo.channels).map((ch) => ch.name);
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      try {
        const newChannel = await socket.newChannel({ name: leoProfanity.clean(name) });
        dispatch(actions.setCurrentChannel(newChannel.id));
        toast.success(t('toast.channelCreated'));
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
    validationSchema: channelValidationSchema(channelsNames, t),
  });

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.addChannel')}</Modal.Title>
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

export default AddChannelModal;
