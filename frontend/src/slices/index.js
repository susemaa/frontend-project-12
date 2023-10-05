import { combineReducers } from '@reduxjs/toolkit';
import channelSlice, { actions as channelActions } from './channelSlice.js';

const actions = { ...channelActions };

export { actions };
export default combineReducers({
  channelsInfo: channelSlice,
});
