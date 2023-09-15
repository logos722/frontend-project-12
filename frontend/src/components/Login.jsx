/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import avatar from '../assets/image/avatar.jpg';
import LoginSchema from '../helpers/validator.js';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
                      isInvalid={formik.touched.password && formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.touched.password && formik.errors.password}
                    </Form.Control.Feedback>
                    <Form.Label htmlFor="password">Ваш пароль</Form.Label>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>

                </Form>

              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  {' '}
                  <Link to="/">Зарегестрироваться</Link>
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
