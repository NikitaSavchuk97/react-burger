import styles from './LoginPage.module.scss';
import { FC, useEffect, useState } from 'react';
import { postLoginUser } from '../../redux/actions/postLoginUser';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { userCurrentLoggedIn, requestStatus, userCurrent } = useSelector(
    (state: any) => state.userCurrentSlice,
  );

  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const onButtonClick = async () => {
    await dispatch(postLoginUser({ emailValue, passValue }));
  };

  useEffect(() => {
    if (userCurrentLoggedIn && requestStatus === 'success') {
      navigate('/');
    }
  }, [requestStatus, userCurrentLoggedIn]);

  return (
    <section className={styles.section}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>Вход</h2>
      <br />
      <EmailInput
        onChange={(e) => setEmailValue(e.target.value)}
        value={emailValue}
        name={'email'}
        placeholder='email'
        isIcon={false}
      />
      <br />
      <PasswordInput
        onChange={(e) => setPassValue(e.target.value)}
        value={passValue}
        name={'password'}
        placeholder='password'
        extraClass='mb-2'
      />
      <br />
      <Button
        onClick={onButtonClick}
        extraClass={styles.section__button}
        htmlType='button'
        type='primary'
        size='medium'
      >
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
    </section>
  );
};

export default LoginPage;
