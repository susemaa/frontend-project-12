import React from 'react';

const Header = ({ currentChannel }) => {
  const channelName = currentChannel ? currentChannel.name : null;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {channelName}
        </b>
      </p>
      <span className="text-muted">
        zxc
      </span>
    </div>
  );
};

export default Header;
