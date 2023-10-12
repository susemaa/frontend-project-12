/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelSlice.js';

const initialState = { messages: [] };

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.getData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
  },
});

const actions = { ...messageSlice.actions };

export { actions };
export default messageSlice.reducer;
