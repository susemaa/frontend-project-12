import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav, Button, Dropdown, ButtonGroup, Col,
} from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { actions } from '../slices/index.js';
import selectModal from './Modals/index.js';

const ModalWindow = ({ modalInfo, handleClose }) => {
  if (!modalInfo.type) {
    return null;
  }

  const ModalComponent = selectModal(modalInfo.type);
  return (<ModalComponent modalInfo={modalInfo} onHide={handleClose} />);
};

const Channels = () => {
  const channelsInfo = useSelector((s) => s.channelsInfo);
  const { channels, currentChannelId } = channelsInfo;

  const dispatch = useDispatch();

  const [modalInfo, setModal] = useState({ type: null, channel: null });
  const openModal = (type, channel = null) => setModal({ type, channel });
  const closeModal = () => setModal({ type: null, channel: null });

  const handleClick = (id) => {
    dispatch(actions.setCurrentChannel(id));
  };

  return (
    <>
      <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between align-items-center">
          <b>Каналы</b>
          <Button className="p-0 text-primary rounded-0 border-0 bg-transparent" variant="outline-primary" onClick={() => openModal('add')}>
            <BsPlusSquare />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav
          as="ul"
          className="flex-column nav-pills nav-fill p-2 mb-3 h-100 d-block overflow-auto"
          id="channels-box"
          activeKey={currentChannelId}
        >
          {channels.map((channel) => {
            const { id, name } = channel;
            return (
              <Nav.Item className="w-100" key={id} as="li">
                <Button
                  className="w-100 rounded-0 text-start text-truncate"
                  variant={id === currentChannelId ? 'secondary' : 'light'}
                  onClick={() => handleClick(id)}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
              </Nav.Item>
            );
          })}
        </Nav>
      </Col>
      <ModalWindow modalInfo={modalInfo} handleClose={closeModal} />
    </>
  );
};

export default Channels;
