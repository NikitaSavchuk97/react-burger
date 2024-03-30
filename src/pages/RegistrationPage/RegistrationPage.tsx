import styles from './RegistrationPage.module.scss';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { postRegisterUser } from '../../redux/actions/postRegisterUser';

const RegistrationPage: FC = () => {
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const dispatch = useDispatch<any>();

  const { userCurrentRegistrSuccessServerAnswer, requestStatus } = useSelector(
    (state: any) => state.userCurrentSlice,
  );

  const onButtonClick = async () => {
    await dispatch(postRegisterUser({ nameValue, emailValue, passValue }));
  };

  useEffect(() => {
    if (userCurrentRegistrSuccessServerAnswer && requestStatus === 'success') {
      navigate('/login');
    }
  }, [requestStatus, userCurrentRegistrSuccessServerAnswer]);

  return (
    <section className={styles.section}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>Регистрация</h2>
      <br />
      <Input
        type={'text'}
        placeholder='name'
        onChange={(e) => setNameValue(e.target.value)}
        value={nameValue}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
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
        Зарегистрироваться
      </Button>
      <br />
      <br />
      <br />
      <h3 className='text text_type_main-small'>
        Вы - уже зарегистрированы?{' '}
        <Link to='/login' className={styles.section__link}>
          Войти
        </Link>
      </h3>
    </section>
  );
};

export default RegistrationPage;
