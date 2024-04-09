import styles from './LoginPage.module.scss';
import { FC, useEffect } from 'react';
import { postLoginUser } from '../../redux/actions/postLoginUser';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { values, handleChange } = useForm({ email: '', password: '' });
  const { userCurrentLoggedIn, requestStatus } = useSelector(
    (state: any) => state.userCurrentSlice,
  );
  const emailValue = values.email;
  const passValue = values.password;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(postLoginUser({ emailValue, passValue }));
  };

  useEffect(() => {
    if (userCurrentLoggedIn && requestStatus === 'success') {
      navigate('/');
    }
  }, [requestStatus, userCurrentLoggedIn]);

  return (
    <form className={styles.section} onSubmit={handleSubmit}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>Вход</h2>
      <br />
      <EmailInput
        onChange={(e) => handleChange(e)}
        value={values.email}
        name={'email'}
        placeholder='email'
        isIcon={false}
      />
      <br />
      <PasswordInput
        onChange={(e) => handleChange(e)}
        value={values.password}
        name={'password'}
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
