import style from './AppHeader.module.scss';

import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useReduxToolkit';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  LockIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader: FC = () => {
  const location = useLocation();
  const { userCurrentLoggedIn } = useSelector((state) => state.userCurrentSlice);

  return (
    <header className={`${style.header}`}>
      <div className={`${style.header__wrapper}`}>
        <Link
          className={`
					${style.header__link} text text_type_main-default pt-4 pr-5 pb-4 pl-5
					${location.pathname === '/' ? style.header__link_active : ''}
					`}
          to='/'
        >
          <BurgerIcon type='primary' />
          <span className='pl-2'>Конструктор</span>
        </Link>

        <Link
          className={`
					${style.header__link} text text_type_main-default pt-4  pb-4 pl-5
					${location.pathname === '/orders' ? style.header__link_active : ''}
					`}
          to='/orders'
        >
          <ListIcon type='primary' />
          <span className='pl-2'>Лента заказов</span>
        </Link>

        <Link to='/' className={style.header__logo}>
          <Logo />
        </Link>

        {userCurrentLoggedIn ? (
          <Link
            className={`
					${style.header__link} text text_type_main-default pt-4 pr-5 pb-4
					${location.pathname === '/profile' ? style.header__link_active : ''}
					`}
            to='/profile'
          >
            <ProfileIcon type='primary' />
            <span className='pl-2'>Личный кабинет</span>
          </Link>
        ) : (
          <Link
            className={`
					${style.header__link} text text_type_main-default pt-4 pr-5 pb-4
					${location.pathname === '/login' ? style.header__link_active : ''}
					`}
            to='/login'
          >
            <LockIcon type='primary' />
            <span className='pl-2'>Войти или зарегистрироваться</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
