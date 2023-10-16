import React from 'react';

const Message = ({ message }) => {
  const { body, username } = message;
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  );
};

export default Message;
