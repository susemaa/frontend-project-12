import React from 'react';
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, Provider } from 'react-redux';
import { actions } from './slices/index.js';
import { SocketContext } from './contexts/index.jsx';
import App from './App.jsx';
import reducer from './slices/index.js';

const SocketProvider = ({ children }) => {
  const webSocket = io();
  const dispatch = useDispatch();

  webSocket.on('newMessage', (payload) => {
    dispatch(actions.addMessage(payload));
  });
  webSocket.on('newChannel', (payload) => {
    dispatch(actions.addChannel(payload));
  });

  const promisify = (...args) => new Promise((resolve, reject) => {
    webSocket.emit(...args, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      }
      reject();
    })
  });

  const sendMessage = (message) => promisify('newMessage', message);
  const newChannel = (channelName) => promisify('newChannel', channelName);

  const socketServices = {
    sendMessage,
    newChannel
  };

  return (
    <SocketContext.Provider value={socketServices}>
      {children}
    </SocketContext.Provider>
  )
};

const init = async () => {
  const store = configureStore({ reducer });
  return (
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  )
};

export default init;
