import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';
import { actions } from '../../slices/index.js';

const RemoveChannelModal = ({ onHide, modalInfo }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((s) => s.channelsInfo);
  const { id } = modalInfo.channel;

  const handleRemove = async () => {
    try {
        await socket.removeChannel({ id });
      if (currentChannelId === id) {
        const defaultId = 1;
        dispatch(actions.setCurrentChannel(defaultId));
      }
      onHide();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.isSure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onHide} className="me-2">
            {t('buttons.cancel')}
          </Button>
          <Button variant="danger" onClick={() => handleRemove()}>
            {t('buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
