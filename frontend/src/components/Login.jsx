/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { useAuthContext } from '../context/index.js';
import avatar from '../assets/image/avatar.jpg';

const Login = () => {
  const rollbar = useRollbar();
  const inputRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const useAuth = useAuthContext();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      console.log('work!');
      try {
        const formDate = JSON.stringify(values, null, 2);
        console.log(formDate);
        const { data } = await axios.post('/api/v1/login', { username: values.username, password: values.password });
        const user = { token: data.token, username: data.username };
        localStorage.setItem('user', JSON.stringify(user));
        useAuth.setUserData(data);
        navigate('/');
      } catch (err) {
        rollbar.error('Login error', err);
        console.error(err);
        if (err.code === 'ERR_NETWORK') {
          toast.error(t('errors.network'));
        }

        if (!err.isAxiosError) {
          toast.error(t('errors.unknown'), {
            position: 'top-right',
            autoClose: 3000,
          });
        }

        if (err.response?.status === 401) {
          // сообщение об ошибке авторизации показываем в форме, а не в тосте
          formik.setStatus({ auth: t('login.authFailed') });
          inputRef.current.select();
        }
      }
    },
  });

  return (
    <React.Fragment key="key">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={avatar}
                    className="rounded-circle"
                    alt="login header"
                  />
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">{t('login.header')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      name="username"
                      id="username"
                      autoComplete="username"
                      required
                      ref={inputRef}
                      placeholder={t('login.username')}
                      isInvalid={formik.touched.username && formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.touched.username && formik.errors.username}
                    </Form.Control.Feedback>
                    <label htmlFor="username">{t('login.username')}</label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      required
                      placeholder={t('login.password')}
                      isInvalid={formik.touched.password && formik.errors.password
                        && formik.errors.auth}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.touched.password && formik.errors.password && formik.errors.auth}
                    </Form.Control.Feedback>
                    <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('login.submit')}</Button>

                </Form>
                {formik.status && (
                  <Alert key="login-error" variant="danger">
                    {formik.status.auth}
                  </Alert>
                )}

              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('login.newToChat')}</span>
                  {' '}
                  <Link to="/signup">{t('login.signup')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
