import useForm from '../../hooks/useForm';
import styles from './RegistrationPage.module.scss';

import { FC, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import { postRegisterUser } from '../../redux/actions/postRegisterUser';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

const RegistrationPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  const nameValue = values.name;
  const emailValue = values.email;
  const passValue = values.password;

  const { userCurrentRegistrSuccessServerAnswer, status } = useSelector(
    (state) => state.userCurrentSlice,
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(postRegisterUser({ nameValue, emailValue, passValue }));
  };

  useEffect(() => {
    if (userCurrentRegistrSuccessServerAnswer && status === 'success') {
      navigate('/login');
    }
  }, [status, userCurrentRegistrSuccessServerAnswer]);

  return (
    <form className={styles.section} onSubmit={handleSubmit}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>Регистрация</h2>
      <br />
      <Input
        type={'text'}
        placeholder='name'
        onChange={(e) => handleChange(e)}
        value={nameValue}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
      <br />
      <EmailInput
        onChange={(e) => handleChange(e)}
        value={emailValue}
        name={'email'}
        placeholder='email'
        isIcon={false}
      />
      <br />
      <PasswordInput
        onChange={(e) => handleChange(e)}
        value={passValue}
        name={'password'}
        placeholder='password'
        extraClass='mb-2'
      />
      <br />
      <Button extraClass={styles.section__button} htmlType='submit' type='primary' size='medium'>
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
    </form>
  );
};

export default RegistrationPage;
