/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
import signUpLogo from '../124.png';

const SignUpPage = () => {
  const [signUpFailed, setSighUpFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: async (values) => {
      console.log(values);
      const { username, password } = values;
      try {
        const res = await axios.post(routes.signup(), { username, password }); // => { token: ..., username }
        setSighUpFailed(false);
        auth.logIn(res.data);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        setSighUpFailed(true);
        console.log(err);
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string()
        .trim()
        .min(3, 'Username is too short - 3 characters minimum')
        .max(20, 'Username is too long - 20 characters maximum')
        .required('Username is required'),
      password: yup.string()
        .trim()
        .min(6, 'Password is too short - 6 characters minimum')
        .required('Password is required'),
      passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    }),
  });

  return (
    <Container fluid className="h-100 mt-5">
      <Row className="h-100 justify-content-center align-content-center">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Row>
                <Col>
                  <div className="text-center">
                    <img src={signUpLogo} className="rounded-circle w-100 h-100" alt="SignUp" />
                  </div>
                </Col>
                <Col>
                  <fieldset disabled={formik.isSubmitting}>
                    <Form onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">Войти</h1>
                      <Form.Group className="form-floating mb-3" controlId="username">
                        <Form.Control
                          name="username"
                          type="text"
                          placeholder="Ваш ник"
                          autoComplete="username"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          isInvalid={!!formik.errors.username}
                        />
                        <Form.Label>Ваш ник</Form.Label>
                        <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="form-floating mb-4" controlId="password">
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Пароль"
                          autoComplete="current-password"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          isInvalid={!!formik.errors.password}
                        />
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="form-floating mb-4" controlId="passwordConfirmation">
                        <Form.Control
                          name="passwordConfirmation"
                          type="password"
                          placeholder="Подтверждение парля"
                          autoComplete="current-passwordConfirmation"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.passwordConfirmation}
                          isInvalid={!!formik.errors.passwordConfirmation}
                        />
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
                      </Form.Group>

                      <div className="text-center mb-4 h-100">
                        <Button variant="outline-primary" type="submit">
                          Зарегистрироваться
                        </Button>
                      </div>
                    </Form>
                  </fieldset>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-1">Уже есть аккаунт?</span>
                <Link to="/login">Войти</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
