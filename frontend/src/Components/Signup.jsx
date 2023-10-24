/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
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
import signUpLogo from '../assets/124.png';

const SignUpPage = () => {
  const [signUpFailed, setSighUpFailed] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef(null);

  const [existingUsernames, setExistingUsernames] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      setSighUpFailed(false);
      try {
        const res = await axios.post(routes.signup(), { username, password });
        auth.logIn(res.data);
        navigate(routes.mainPage());
      } catch (err) {
        formik.setSubmitting(false);
        setSighUpFailed(true);

        if (err.response.status === 409) {
          setExistingUsernames([...existingUsernames, username]);
          return;
        }

        if (err.isAxiosError) {
          toast.error(t('toast.networkError'));
          return;
        }
        toast.error(t('toast.unknownError'));
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string()
        .trim()
        .min(3, t('validation.min'))
        .max(20, t('validation.max'))
        .required(t('validation.required')),
      password: yup.string()
        .trim()
        .min(6, t('validation.minPassword'))
        .required(t('validation.required')),
      passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], t('validation.passwordConfirmation')),
    }),
  });

  const handleExisting = () => (existingUsernames.find((username) => username === formik.values.username) ? t('validation.exists') : null);

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
                      <h1 className="text-center mb-4">{t('forms.signup')}</h1>
                      <Form.Group className="form-floating mb-3" controlId="username">
                        <Form.Control
                          name="username"
                          type="text"
                          placeholder={t('forms.newUsername')}
                          autoComplete="username"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          isInvalid={(formik.touched.username || formik.errors.username)
                            || signUpFailed}
                          ref={inputRef}
                        />
                        <Form.Label>{t('forms.newUsername')}</Form.Label>
                        <Form.Control.Feedback type="invalid">
                          {handleExisting()}
                          {formik.errors.username}
                        </Form.Control.Feedback>
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
                          isInvalid={(formik.touched.password || formik.errors.password)}
                        />
                        <Form.Label>{t('forms.password')}</Form.Label>
                        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="form-floating mb-4" controlId="passwordConfirmation">
                        <Form.Control
                          name="passwordConfirmation"
                          type="password"
                          placeholder={t('forms.passwordConfirmation')}
                          autoComplete="current-passwordConfirmation"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.passwordConfirmation}
                          isInvalid={(formik.touched.passwordConfirmation
                            || formik.errors.passwordConfirmation)}
                        />
                        <Form.Label>{t('forms.passwordConfirmation')}</Form.Label>
                        <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
                      </Form.Group>

                      <div className="text-center mb-4 w-100">
                        <Button variant="outline-primary" type="submit" className="w-100">
                          {t('buttons.signup')}
                        </Button>
                      </div>
                    </Form>
                  </fieldset>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-1">{t('forms.haveAccount')}</span>
                <Link to={routes.loginPage()}>{t('forms.login')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
