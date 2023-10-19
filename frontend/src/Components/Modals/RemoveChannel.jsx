import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useSocket } from '../../hooks/index.jsx';
import { actions } from '../../slices/index.js';

const RemoveChannelModal = ({ onHide, modalInfo }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onHide} className="me-2">
            Отменить
          </Button>
          <Button variant="danger" onClick={() => handleRemove()}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
