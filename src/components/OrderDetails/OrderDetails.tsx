import Loader from '../Loader/Loader';
import styles from './OrderDetails.module.scss';

import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { IngredientPropType } from '../../utils/types';
import { formatOrderDate, reducePrice } from '../../utils/methods';
import { getCurrentOrder } from '../../redux/actions/getCurrentOrder';
import { useSelector, useDispatch } from '../../hooks/useReduxToolkit';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentOrder, setCurrentOrder] = useState<any | null>(null);
  const { orderDetails, uploadedOrderDetails, status } = useSelector(
    (state) => state.orderDetailsSlice,
  );
  const { ingredients } = useSelector((state) => state.ingredientsSlice);

  useEffect(() => {
    if (orderDetails) {
      setCurrentOrder(orderDetails);
    } else if (!orderDetails && !uploadedOrderDetails) {
      if (id) {
        dispatch(getCurrentOrder({ id }));
      }
    }
  }, [orderDetails, dispatch, id]);

  return currentOrder ? (
    currentOrder ? (
      <section className={styles.section}>
        <p className={`${styles.section__number} text text_type_digits-default`}>
          #{currentOrder?.number}
        </p>
        <br />
        <h2 className={`${styles.section__title} text text_type_main-medium`}>
          {currentOrder?.name}
        </h2>
        <p className={`${styles.section__status} text text_type_main-default`}>
          {currentOrder?.status === 'done' ? 'Выполнен' : 'Готовится'}
        </p>
        <br />
        <h2 className={`${styles.section__title} text text_type_main-medium`}>Состав:</h2>
        <ul className={styles.section__list}>
          {currentOrder?.ingredients?.map((id: string) => {
            const currentIngredient = ingredients?.find(
              (ing: IngredientPropType) => ing._id === id,
            );

            return (
              <li className={styles.section__list__item} key={uuidv4()}>
                <img
                  className={styles.section__list__item_image}
                  src={currentIngredient?.image_mobile}
                  alt=''
                />
                <h3 className={`${styles.section__list__item_name} text text_type_main-default`}>
                  {currentIngredient?.name}
                </h3>
                <p className={`${styles.section__list__item_price} text text_type_main-default`}>
                  {currentIngredient?.price}
                  <CurrencyIcon type='primary' />
                </p>

                <div className={styles.section__wrapper}>
                  <p></p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.section__info}>
          <p className={`${styles.section__info_date} text text_type_main-default`}>
            {formatOrderDate(currentOrder?.createdAt)}
          </p>

          {ingredients && (
            <p className={`${styles.section__info_date} text text_type_main-default`}>
              {reducePrice(currentOrder?.ingredients, ingredients)}
            </p>
          )}
        </div>
      </section>
    ) : (
      <></>
    )
  ) : status === 'error' ? (
    <>ОШИБКА ПРИ ПОИСКЕ ЗАКАЗА</>
  ) : (
    <Loader />
  );
};

export default OrderDetails;
