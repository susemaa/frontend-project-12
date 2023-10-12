import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App.jsx';
import reducer from './slices/index.js';
import './index.css';

const store = configureStore({ reducer });
const root = ReactDOM.createRoot(document.getElementById('root'));
document.getElementById('root').classList.add('h-100');

root.render(
  <div className="h-100">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </div>,
);
