import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Минимум 3 символа').required('Обязательное поле'),
  password: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(6, 'Минимум 6 симолов'),
});

const RegisterSchema = Yup.object().shape({
  username: Yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов'),
  password: Yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(6, 'Минимум 6 симолов'),
  confirmPassword: Yup
    .string()
    .test('confirmPassword', 'Пароли должны совпадать', (value, context) => value === context.parent.password),
});

export { LoginSchema, RegisterSchema };
