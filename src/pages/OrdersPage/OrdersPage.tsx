import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './OrdersPage.module.scss';

const OrdersPage: FC = () => {
  return (
    <section className={styles.section}>
      <h2 className='text text_type_main-large'>Лента заказов</h2>
      <Outlet />
    </section>
  );
};

export default OrdersPage;
