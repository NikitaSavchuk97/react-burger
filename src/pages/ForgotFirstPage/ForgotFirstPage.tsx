import styles from './ForgotFirstPage.module.scss';
import { postForgotPass } from '../../redux/actions/postForgotPass';
import { useSelector, useDispatch } from 'react-redux';
import { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm';

const ForgotFirstPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { requestStatus, userCurrentForgotPassServerAnswer } = useSelector(
    (state: any) => state.userCurrentSlice,
  );

  const { values, handleChange } = useForm({ email: '' });
  const emailValue = values.email;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(postForgotPass(emailValue));
  };

  useEffect((): any => {
    if (userCurrentForgotPassServerAnswer === true && requestStatus === 'success') {
      navigate('/reset-password');
    }
  }, [requestStatus, userCurrentForgotPassServerAnswer]);

  return (
    <form className={styles.section} onSubmit={handleSubmit}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <br />
      <EmailInput
        onChange={(e) => handleChange(e)}
        name={'email'}
        value={emailValue}
        placeholder='email'
        isIcon={false}
      />
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

export default ForgotFirstPage;
