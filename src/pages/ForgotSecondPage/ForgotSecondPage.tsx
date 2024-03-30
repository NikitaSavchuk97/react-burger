import styles from './ForgotSecondPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { postResetPass } from '../../redux/actions/postResetPass';
import { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotSecondPage: FC = () => {
  const { requestStatus, userCurrentResetPassServerAnswer } = useSelector(
    (state: any) => state.userCurrentSlice,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [keyValue, setKeyValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const onButtonClick = async () => {
    await dispatch(postResetPass({ keyValue, passValue }));
  };

  useEffect(() => {
    if (userCurrentResetPassServerAnswer === true && requestStatus === 'success') {
      navigate('/login');
    }
  }, [requestStatus, userCurrentResetPassServerAnswer]);

  return (
    <section className={styles.section}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <br />
      <PasswordInput
        onChange={(e) => setPassValue(e.target.value)}
        value={passValue}
        name={'password'}
        placeholder='password'
        extraClass='mb-2'
      />
      <br />
      <Input
        type={'text'}
        placeholder='key'
        onChange={(e) => setKeyValue(e.target.value)}
        value={keyValue}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
      <br />
      <br />
      <Button
        onClick={onButtonClick}
        extraClass={styles.section__button}
        htmlType='button'
        type='primary'
        size='medium'
      >
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
    </section>
  );
};

export default ForgotSecondPage;
