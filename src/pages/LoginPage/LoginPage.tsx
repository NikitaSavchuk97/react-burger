import useForm from '../../hooks/useForm';
import styles from './LoginPage.module.scss';

import { FC, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginUser } from '../../redux/actions/postLoginUser';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userCurrentLoggedIn, status } = useSelector((state) => state.userCurrentSlice);

  const { values, handleChange } = useForm({ email: '', password: '' });
  const emailValue = values.email;
  const passValue = values.password;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(postLoginUser({ emailValue, passValue }));
  };

  useEffect(() => {
    if (userCurrentLoggedIn && status === 'success') {
      navigate('/');
    }
  }, [status, userCurrentLoggedIn]);

  return (
    <form className={styles.section} onSubmit={handleSubmit}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>Вход</h2>
      <br />
      <EmailInput
        onChange={(e) => handleChange(e)}
        value={values.email}
        name='email'
        autoComplete='username'
        placeholder='email'
        isIcon={false}
      />
      <br />
      <PasswordInput
        onChange={(e) => handleChange(e)}
        value={values.password}
        name='password'
        autoComplete='current-password'
        placeholder='password'
        extraClass='mb-2'
      />
      <br />
      <Button extraClass={styles.section__button} htmlType='submit' type='primary' size='medium'>
        Войти
      </Button>
      <br />
      <br />
      <br />
      <h3 className='text text_type_main-small'>
        Вы - новый пользователь?{' '}
        <Link to='/register' className={styles.section__link}>
          Зарегистрироваться
        </Link>
      </h3>
      <br />
      <h3 className='text text_type_main-small'>
        Забыли пароль?{' '}
        <Link to='/forgot-password' className={styles.section__link}>
          Восстановить пароль
        </Link>
      </h3>
    </form>
  );
};

export default LoginPage;
