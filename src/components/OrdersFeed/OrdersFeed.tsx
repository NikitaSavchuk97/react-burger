import Loader from '../Loader/Loader';
import styles from './OrdersFeed.module.scss';
import OrdersList from '../OrdersList/OrdersList';
import CenterElements from '../CenterElements/CenterElements';

import { FC, useEffect } from 'react';
import { OrderPropTypes } from '../../utils/types';
import { useSelector, useDispatch } from '../../hooks/useReduxToolkit';
import { onCloseAllOrders, onConnectAllOrders } from '../../redux/slices/webSocketSlice';

const OrdersFeed: FC = () => {
  const dispatch = useDispatch();
  const { socketAllOrders, socketTotalOrders, socketTotalTodayOrders } = useSelector(
    (state) => state.webSocketSlice,
  );

  useEffect(() => {
    dispatch(onConnectAllOrders());
    return () => {
      dispatch(onCloseAllOrders());
    };
  }, []);

  return socketAllOrders ? (
    <section className={styles.wrapper}>
      <OrdersList />
      <div className={styles.info}>
        <div className={styles.info__orders}>
          <div>
            <h2 className='text text_type_main-large'>Готовы:</h2>
            <ul className={styles.list}>
              {socketAllOrders
                ?.filter((item: OrderPropTypes) => item.status === 'done')
                .slice(0, 5)
                .map((order: OrderPropTypes) => {
                  return (
                    order.status === 'done' && (
                      <li
                        className={`${styles.list_item} text text_type_digits-medium`}
                        key={order._id}
                      >
                        {order.number}
                      </li>
                    )
                  );
                })}
            </ul>
          </div>
          <div>
            <h2 className='text text_type_main-large'>В работе:</h2>
            <ul className={styles.list}>
              {socketAllOrders?.slice(0, 5).map((order: OrderPropTypes) => {
                return (
                  order.status !== 'done' && (
                    <li
                      className={`${styles.list_item} text text_type_digits-medium`}
                      key={order._id}
                    >
                      {order.number}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
        <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
        <p className={`${styles.info__counter} text text_type_digits-large`}>{socketTotalOrders}</p>
        <br />
        <br />
        <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
        <p className={`${styles.info__counter} text text_type_digits-large`}>
          {socketTotalTodayOrders}
        </p>
      </div>
    </section>
  ) : (
    <CenterElements>
      <Loader />
    </CenterElements>
  );
};

export default OrdersFeed;
