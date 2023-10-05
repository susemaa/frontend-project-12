/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

const getData = createAsyncThunk(
  'channel/getInitialData',
  async (header, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.data(), { headers: header });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState = { loading: false, channels: [], currentChannelId: null };

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
      })
      .addCase(getData.rejected, (state) => {
        state.loading = false;
      });
  },
});

const actions = { ...channelSlice.actions, getData };

export { actions };

export default channelSlice.reducer;
