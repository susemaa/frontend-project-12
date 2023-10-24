import React, { useState, useMemo, useCallback } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Page404 from './Components/Page404.jsx';
import MainPage from './Components/Main.jsx';
import LoginPage from './Components/Login.jsx';
import MyNavbar from './Components/Navbar.jsx';
import { AuthContext } from './contexts/index.jsx';
import { useAuth } from './hooks/index.jsx';
import routes from './routes.js';
import SignUpPage from './Components/Signup.jsx';

const AuthProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('userInfo'));

  const [user, setUser] = useState(
    savedUserData ? { username: savedUserData.username, token: savedUserData.token } : null,
  );

  const logIn = useCallback((userData) => {
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
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path={routes.unknownPath()} element={<Page404 />} />
          <Route path={routes.mainPage()} element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signupPage()} element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    <ToastContainer />
  </AuthProvider>
);

export default App;
