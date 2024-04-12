import useForm from '../../hooks/useForm';
import styles from './ForgotSecondPage.module.scss';

import { FC, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postResetPass } from '../../redux/actions/postResetPass';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotSecondPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, userCurrentResetPassServerAnswer } = useSelector(
    (state) => state.userCurrentSlice,
  );

  const { values, handleChange } = useForm({ key: '', password: '' });
  const keyValue = values.key;
  const passValue = values.password;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(postResetPass({ keyValue, passValue }));
  };

  useEffect(() => {
    if (userCurrentResetPassServerAnswer === true && status === 'success') {
      navigate('/login');
    }
  }, [status, userCurrentResetPassServerAnswer]);

  return (
    <form className={styles.section} onSubmit={handleSubmit}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <br />
      <PasswordInput
        onChange={(e) => handleChange(e)}
        value={passValue}
        name={'password'}
        placeholder='password'
        extraClass='mb-2'
      />
      <br />
      <Input
        type={'text'}
        placeholder='key'
        onChange={(e) => handleChange(e)}
        value={keyValue}
        name={'key'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
      <br />
      <br />
      <Button extraClass={styles.section__button} htmlType='submit' type='primary' size='medium'>
        Восстановить
      </Button>
      <br />
      <br />
      <br />
      <h3 className='text text_type_main-small'>
        Вспомнили пароль?{' '}
        <Link to='/login' className={styles.section__link}>
          Войти
        </Link>
      </h3>
    </form>
  );
};

export default ForgotSecondPage;
