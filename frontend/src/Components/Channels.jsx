import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav, Button, Dropdown, ButtonGroup, Col,
} from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { actions } from '../slices/index.js';

const Channels = () => {
  const channelsInfo = useSelector((s) => s.channelsInfo);
  const { channels, currentChannelId } = channelsInfo;
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(actions.setCurrentChannel(id));
  };

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between align-items-center">
        <b>Каналы</b>
        <Button className="p-0 text-primary rounded-0 border-0 bg-transparent" variant="outline-primary">
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
                className="w-100 rounded-0 text-start"
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
  );
};

export default Channels;
