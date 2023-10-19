/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelSlice.js';

const initialState = { messages: [] };

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.getData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        state.messages = state.messages
          .filter((message) => message.channelId !== payload.id);
      });
  },
});

const actions = { ...messageSlice.actions };

export { actions };
export default messageSlice.reducer;
