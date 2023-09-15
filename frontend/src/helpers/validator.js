import * as Yup from 'yup';

const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Минимум 3 символа').required('Обязательное поле'),
  password: Yup.string().matches(passwordReg, { message: 'Пожалуйста создайте пароль который содержит минимум 8 символом, из которых минимум одна буква и одна цифра' }).required('Обязательное поле'),
});

export default LoginSchema;
