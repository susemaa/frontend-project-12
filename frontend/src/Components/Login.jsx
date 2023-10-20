/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
import logo from '../123.png';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const res = await axios.post(routes.login(), { username, password });
        setAuthFailed(false);
        auth.logIn(res.data);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        setAuthFailed(true);
        if (err.response.status === 401) {
          return;
        }
        if (err.isAxiosError) {
          toast.error(t('toast.networkError'));
          return;
        }
        toast.error(t('toast.unknownError'));
      }
    },
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
                    <img src={logo} className="rounded-circle w-100 h-100" alt="Welcome" />
                  </div>
                </Col>
                <Col>
                  <fieldset disabled={formik.isSubmitting}>
                    <Form onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">{t('forms.login')}</h1>
                      <Form.Group className="form-floating mb-3" controlId="username">
                        <Form.Control
                          name="username"
                          type="text"
                          placeholder={t('forms.username')}
                          autoComplete="username"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          isInvalid={authFailed}
                          ref={inputRef}
                        />
                        <Form.Label>{t('forms.username')}</Form.Label>
                      </Form.Group>

                      <Form.Group className="form-floating mb-4" controlId="password">
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder={t('forms.password')}
                          autoComplete="current-password"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          isInvalid={authFailed}
                        />
                        <Form.Label>{t('forms.password')}</Form.Label>
                        <Form.Control.Feedback type="invalid">{t('forms.invalidLogin')}</Form.Control.Feedback>
                      </Form.Group>

                      <div className="text-center mb-4">
                        <Button variant="outline-primary" type="submit">
                          {t('forms.login')}
                        </Button>
                      </div>
                    </Form>
                  </fieldset>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-1">{t('forms.noAccount')}</span>
                <Link to="/signup">{t('forms.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
