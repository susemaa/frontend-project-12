import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { MdLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';

const MyNavbar = () => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const otherLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
  return (
    <Navbar className="shadow-sm" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Button onClick={() => i18n.changeLanguage(otherLanguage)} variant="outline-primary text-dark bg-transparent" className="border-0">
          <MdLanguage />
          <span className="visually-hidden">{t('changeLanguage')}</span>
        </Button>
        {auth.user ? (<Button onClick={auth.logOut}>{t('buttons.logOut')}</Button>) : null}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
