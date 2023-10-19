import AddChannelModal from './AddChannel.jsx';
import RemoveChannelModal from './RemoveChannel.jsx';
import RenameChannelModal from './RenameChannel.jsx';

const selector = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

export default (type) => selector[type];
