import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import avatar from '../assets/image/avatar.jpg';
import { RegisterSchema } from '../helpers/validator.js';

const Registration = () => {
  const navigate = useNavigate();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);

      try {
        const res = await axios.post(
          '/api/v1/signup',
          { username: values.username, password: values.password },
        );
        const { token, username } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/', { replace: false });
      } catch (err) {
        // rollbar.error(err);
        if (!err.isAxiosError) {
          throw err;
        }

        if (err.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }

        throw err;
      }
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={avatar}
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Tota"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || registrationFailed
                    }
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Не менее 6 символов"
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    isInvalid={
                      (formik.errors.password && formik.touched.password)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    id="confirmPassword"
                    isInvalid={
                      (formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed
                      ? 'Такой пользователь уже существует'
                      : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>

                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
