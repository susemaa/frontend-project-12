import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Form, Button, InputGroup, Container,
} from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useAuth, useSocket } from '../../hooks/index.jsx';

const SendingWindow = ({ currentChannel }) => {
  const { user } = useAuth();
  const socket = useSocket();

  const msgRef = useRef(null);

  useEffect(() => {
    msgRef.current.focus();
  }, [currentChannel]);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async ({ text }) => {
      const message = {
        body: text,
        channelId: currentChannel.id,
        username: user.username,
      };
      try {
        await socket.sendMessage(message);
        formik.values.text = '';
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <Container className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <Form.Control
            name="text"
            ref={msgRef}
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
            value={formik.values.text}
            onChange={formik.handleChange}
            required
          />
          <Button
            type="submit"
            className="group-vertical border-0 bg-transparent text-dark"
            disabled={formik.isSubmitting || formik.values.text.length === 0}
          >
            <BsArrowRightSquare size={20} />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default SendingWindow;
