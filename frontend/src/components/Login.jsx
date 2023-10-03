/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import avatar from '../assets/image/avatar.jpg';
import { LoginSchema } from '../helpers/validator.js';

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const { username } = values;
        const formDate = JSON.stringify(values, null, 2);
        console.log(formDate);
        const serverData = await axios.post('/api/v1/login', { username: formDate.username, password: formDate.password }).then((response) => {
          return response.data;
        });
        const { token } = serverData;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/', { replace: false });
      } catch (e) {
        console.log(e);
        if (e.code === 'ERR_BAD_REQUEST') {
          formik.setStatus({ auth: 'Вы не зарегистрированы, пожалуйста, зарегистрируйтесь' });
        } else {
          formik.setStatus({ auth: 'Вы не зарегистрированы, пожалуйста, зарегистрируйтесь' });
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
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      name="username"
                      id="username"
                      autoComplete="username"
                      required
                      placeholder="Ваш ник"
                      isInvalid={formik.touched.username && formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.touched.username && formik.errors.username}
                    </Form.Control.Feedback>
                    <label htmlFor="username">Ваш ник</label>
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
                      placeholder="Ваш пароль"
                      isInvalid={formik.touched.password && formik.errors.password
                        && formik.errors.auth}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.touched.password && formik.errors.password && formik.errors.auth}
                    </Form.Control.Feedback>
                    <Form.Label htmlFor="password">Ваш пароль</Form.Label>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>

                </Form>
                {formik.status && (
                  <Alert key="login-error" variant="danger">
                    {formik.status.auth}
                  </Alert>
                )}

              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  {' '}
                  <Link to="/signup">Зарегестрироваться</Link>
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
