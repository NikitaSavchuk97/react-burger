import Loader from '../Loader/Loader';
import styles from './OrdersList.module.scss';
import CenterElements from '../CenterElements/CenterElements';

import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';
import { ItemPropTypes, OrderPropTypes } from '../../utils/types';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { formatOrderDate, reducePrice } from '../../utils/methods';
import { useSelector, useDispatch } from '../../hooks/useReduxToolkit';
import { addOrderDetails } from '../../redux/slices/orderDetailsSlice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { onCloseUserOrders, onConnectUserOrders } from '../../redux/slices/webSocketSlice';

const OrdersList: FC = () => {
  const [orderList, setOrderList] = useState<Array<OrderPropTypes> | null>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const { ingredients } = useSelector((state) => state.ingredientsSlice);
  const { userCurrentLoggedIn } = useSelector((state) => state.userCurrentSlice);
  const { socketAllOrders, socketUserOrders } = useSelector((state) => state.webSocketSlice);

  useEffect(() => {
    if (userCurrentLoggedIn && location.pathname === '/profile/orders') {
      dispatch(onConnectUserOrders());
      return () => {
        dispatch(onCloseUserOrders());
      };
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/feed') {
      setOrderList(socketAllOrders);
    } else if (location.pathname === '/profile/orders') {
      setOrderList(socketUserOrders);
    }
  }, [socketAllOrders, socketUserOrders, orderList]);

  const onItemGrab: MouseEventHandler<HTMLElement> = (e) => {
    const targetElement = (e.target as Element).closest('li');
    const itemData = orderList?.find((item: OrderPropTypes) => item._id === targetElement?.id);
    if (itemData) {
      dispatch(addOrderDetails(itemData));
    }
  };

  return ingredients && orderList !== null ? (
    <ul className={styles.list}>
      {orderList?.map((item: OrderPropTypes) => {
        return (
          <Link
            style={{ textDecoration: 'none' }}
            to={location.pathname === '/feed' ? `/feed/${item._id}` : `/profile/orders/${item._id}`}
            state={{ background: location }}
            key={item._id}
          >
            <li className={`${styles.list__item}`} onClick={onItemGrab} id={item._id}>
              <div className={`${styles.list__item__info} `}>
                <p className={`${styles.list__item__info_id} text text_type_digits-default`}>
                  #{item.number}
                </p>

                <p className={`${styles.list__item__info_time} text text_type_main-default`}>
                  {formatOrderDate(item.createdAt)}
                </p>
              </div>
              <h3 className={`${styles.list__item_title} text text_type_main-default`}>
                {item.name}
              </h3>

              <div className={styles.list__item__info}>
                <ul className={styles.list__item__info_img__list}>
                  {item.ingredients.map((ingredientId) => {
                    const foundIngredient = ingredients.find(
                      (item: ItemPropTypes) => item._id === ingredientId,
                    );
                    return (
                      <li className={styles.list__item__info_img__list_item} key={uuidv4()}>
                        <img
                          className={styles.list__item__info_img__list_item_image}
                          src={foundIngredient?.image_mobile}
                          alt=''
                        />
                      </li>
                    );
                  })}
                </ul>

                <p className={`${styles.list__item__info_price} text text_type_main-medium`}>
                  {reducePrice(item.ingredients, ingredients)} <CurrencyIcon type='primary' />
                </p>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  ) : (
    <CenterElements>
      <Loader />
    </CenterElements>
  );
};

export default OrdersList;
