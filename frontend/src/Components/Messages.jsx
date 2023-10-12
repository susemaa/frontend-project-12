import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import Header from './MessagesHeader';
//import SendingWindow from './SendingWindow.jsx';
//import Message from './Message.jsx';

const Messages = () => {
  const { channels, currentChannelId } = useSelector((s) => s.channelsInfo);
  const currentChannel = channels.find((ch) => ch.id === currentChannelId);
  return (
    <Col className="p-0 h-100 d-flex flex-column">
      <Header currentChannel={currentChannel} />
      <div id="message-box" className="chat-messages overflow-auto px-5">
        MESSAGES
      </div>
      <div className="mt-auto px-5 py-3">
        SENDING BOX
      </div>
    </Col>
  );
};

export default Messages;
