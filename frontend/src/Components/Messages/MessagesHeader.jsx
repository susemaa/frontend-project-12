import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ currentChannel, messagesAmount }) => {
  const { t } = useTranslation();
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
        {t('messages.amount', { count: messagesAmount })}
      </span>
    </div>
  );
};

export default Header;
