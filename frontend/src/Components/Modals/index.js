import AddChannelModal from './addChannel.jsx';

const selector = {
  add: AddChannelModal,
};

export default (type) => selector[type];
