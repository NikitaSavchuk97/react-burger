import appHeaderStyles from './AppHeader.module.scss';
import { Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={`${appHeaderStyles.header}`}>
      <div className={`${appHeaderStyles.header__wrapper}`}>
        <Link
          className={`${appHeaderStyles.header__link} text text_type_main-default pt-4 pr-5 pb-4 pl-5`}
          to='/constructor'
        >
          <BurgerIcon type='primary' />
          <span className='pl-2'>Конструктор</span>
        </Link>

        <Link
          className={`${appHeaderStyles.header__link} text text_type_main-default pt-4  pb-4 pl-5`}
          to='/orders'
        >
          <ListIcon type='primary' />
          <span className='pl-2'>Лента заказов</span>
        </Link>

        <Link to='/' className={appHeaderStyles.header__logo}>
          <Logo />
        </Link>

        <Link
          className={`${appHeaderStyles.header__link} text text_type_main-default pt-4 pr-5 pb-4`}
          to='/profile'
        >
          <ProfileIcon type='primary' />
          <span className='pl-2'>Личный кабинет</span>
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
