import styles from './ProfilePage.module.scss';
import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { postLogoutUser } from '../../redux/actions/postLogoutUser';
import { useDispatch } from 'react-redux';

const ProfilePage: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onButtonClick = async () => {
    await dispatch(postLogoutUser());
    navigate('/login');
  };

  return (
    <section className={styles.section}>
      <div className={styles.section__links}>
        <Link
          to='/profile'
          className={`
						${styles.section__links_link}
						text text_type_main-default 
						${location.pathname === '/profile' ? styles.section__links_link_active : ''}
					`}
        >
          Пофиль
        </Link>
        <br />
        <br />
        <Link
          to='orders'
          className={`
						${styles.section__links_link}
						text text_type_main-default
						${location.pathname === '/profile/orders' ? styles.section__links_link_active : ''}
					`}
        >
          История заказов
        </Link>
        <br />
        <br />
        <Button
          onClick={onButtonClick}
          extraClass={styles.section__links_button}
          htmlType='button'
          type='primary'
          size='medium'
        >
          Выход
        </Button>
      </div>
      <Outlet />
    </section>
  );
};

export default ProfilePage;
