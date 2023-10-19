import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';

const MyNavbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.user ? (<Button onClick={auth.logOut}>{t('buttons.logOut')}</Button>) : null}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
