import React, { useState, useMemo, useCallback } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Page404 } from './Components/Pages.jsx';
import MainPage from './Components/Main.jsx';
import LoginPage from './Components/Login.jsx';
import { AuthContext } from './contexts/index.jsx';
import { useAuth } from './hooks/index.jsx';
import routes from './routes.js';

const AuthProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('userInfo'));
  console.log('123', savedUserData);

  const [user, setUser] = useState(
    savedUserData ? { username: savedUserData.username, token: savedUserData.token } : null,
  );

  const logIn = useCallback((userData) => {
    console.log(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser({ username: userData.username, token: userData.token });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    setUser(null);
  }, []);

  const authServices = useMemo(() => ({ user, logIn, logOut }), [user, logIn, logOut]);

  return (
    <AuthContext.Provider value={authServices}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.user ? children : <Navigate to={routes.loginPage()} />
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      {/* NAVBAR */}
      NAVBAR
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </AuthProvider>
);

export default App;
