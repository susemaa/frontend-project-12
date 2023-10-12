import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Form, Button, InputGroup, Container,
} from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';
import * as yup from 'yup';

const SendingWindow = () => {
  const messageRef = useRef(null);
  useEffect(() => {
    messageRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
  });
  return (
    <Container className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
      >
        <InputGroup>
          <Form.Control
            name="text"
            ref={messageRef}
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
