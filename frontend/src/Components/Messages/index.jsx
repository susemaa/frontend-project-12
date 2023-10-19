import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import Header from './MessagesHeader.jsx';
import SendingWindow from './SendingWindow.jsx';
import Message from './Message.jsx';

const Messages = () => {
  const { channels, currentChannelId } = useSelector((s) => s.channelsInfo);
  const { messages } = useSelector((s) => s.messagesInfo);
  const currentChannel = channels.find((ch) => ch.id === currentChannelId);

  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);
  const messageBoxRef = useRef(null);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  return (
    <Col className="p-0 h-100 d-flex flex-column">
      <Header currentChannel={currentChannel} messagesAmount={currentMessages.length} />
      <div id="message-box" className="chat-messages overflow-auto px-5" ref={messageBoxRef}>
        {currentMessages.map((message) => (<Message key={message.id} message={message} />))}
      </div>
      <SendingWindow currentChannel={currentChannel} />
    </Col>
  );
};

export default Messages;
