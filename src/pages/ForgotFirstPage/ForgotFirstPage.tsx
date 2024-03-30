import styles from './ForgotFirstPage.module.scss';
import { postForgotPass } from '../../redux/actions/postForgotPass';
import { useSelector, useDispatch } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
//import userCurrentSlice from '../../redux/slices/userCurrentSlice';

const ForgotFirstPage: FC = () => {
  const { requestStatus, userCurrentForgotPassServerAnswer } = useSelector(
    (state: any) => state.userCurrentSlice,
  );
  const dispatch = useDispatch<any>();
  const [emailValue, setEmailValue] = useState<string>('');
  const navigate = useNavigate();

  const onButtonClick = async () => {
    await dispatch(postForgotPass(emailValue));
  };

  useEffect((): any => {
    if (userCurrentForgotPassServerAnswer === true && requestStatus === 'success') {
      navigate('/reset-password');
    }
  }, [requestStatus, userCurrentForgotPassServerAnswer]);

  return (
    <section className={styles.section}>
      <h2 className={`${styles.section__title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <br />
      <EmailInput
        onChange={(e) => setEmailValue(e.target.value)}
        value={emailValue}
        placeholder='email'
        isIcon={false}
      />
      <br />

      <Button
        extraClass={styles.section__button}
        onClick={onButtonClick}
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

export default ForgotFirstPage;
