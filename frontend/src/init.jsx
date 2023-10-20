import React from 'react';
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { actions } from './slices/index.js';
import { SocketContext } from './contexts/index.jsx';
import App from './App.jsx';
import reducer from './slices/index.js';
import resources from './locales/index.js';

const SocketProvider = ({ children }) => {
  const webSocket = io();
  const dispatch = useDispatch();

  webSocket.on('newMessage', (payload) => {
    dispatch(actions.addMessage(payload));
  });
  webSocket.on('newChannel', (payload) => {
    dispatch(actions.addChannel(payload));
  });
  webSocket.on('removeChannel', (payload) => {
    dispatch(actions.removeChannel(payload));
  });
  webSocket.on('renameChannel', (payload) => {
    dispatch(actions.renameChannel(payload));
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
  const removeChannel = (channel) => promisify('removeChannel', channel);
  const renameChannel = (channel) => promisify('renameChannel', channel);

  const socketServices = {
    sendMessage,
    newChannel,
    removeChannel,
    renameChannel,
  };

  return (
    <SocketContext.Provider value={socketServices}>
      {children}
    </SocketContext.Provider>
  )
};

const init = async () => {
  const store = configureStore({ reducer });

  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru', 
      interpolation: {
        escapeValue: false, // экранирование уже есть в React, поэтому отключаем
      },
    });
    
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </I18nextProvider>
    </Provider>
  )
};

export default init;
