import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useAuth } from '../hooks/index.jsx';

const MyNavbar = () => {
  const auth = useAuth();
  return (
    <Navbar className="shadow-sm" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.user ? (<Button onClick={auth.logOut}>Выйти</Button>) : null}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
