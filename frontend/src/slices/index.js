import { combineReducers } from '@reduxjs/toolkit';
import channelSlice, { actions as channelActions } from './channelSlice.js';
import messageSlice, { actions as messageActions } from './messageSlice.js';

const actions = { ...channelActions, ...messageActions };

export { actions };
export default combineReducers({
  channelsInfo: channelSlice,
  messagesInfo: messageSlice,
});
