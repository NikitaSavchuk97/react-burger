import style from './BurgerConstructor.module.scss';
import ConstructorIngredient from '../ConstructorIngredient/ConstructorIngredient';

import { FC, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { postOrderUser } from '../../redux/actions/postOrderUser';
import { ItemPropTypes, ProductPropType } from '../../utils/types';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  addBunCurrent,
  addToOrderList,
  clearOrderList,
  addIngredientsCurrent,
  setTotalPrice,
} from '../../redux/slices/ingredientsCurrentSlice';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCurrentLoggedIn } = useSelector((state) => state.userCurrentSlice);
  const {
    bunCurrent,
    ingredientsCurrent,
    orderCurrentList,
    orderCurrentInProgress,
    totalPrice,
    status,
  } = useSelector((state) => state.ingredientsCurrentSlice);

  const getOrderPrice = () => {
    const mainPrice = orderCurrentList.reduce(
      (acc: number, curr: ItemPropTypes) => acc + curr.price,
      0,
    );
    dispatch(setTotalPrice(mainPrice));
  };

  const [, dropBun] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    collect: (monitor) => ({
      isHoverBun: monitor.isOver(),
    }),
    drop: (item: ItemPropTypes) => {
      if (item.type === 'bun') {
        dispatch(addBunCurrent(item));
      } else {
        return;
      }
    },
  });

  const [, dropIngredients] = useDrop({
    accept: ['sauce', 'main'],
    collect: (monitor) => ({
      isHoverIngredient: monitor.isOver(),
    }),
    drop: (item: ItemPropTypes) => {
      if (item.type !== 'bun') {
        const removeId = uuidv4();
        dispatch(addIngredientsCurrent({ item, removeId }));
      } else {
        return;
      }
    },
  });

  const getMainBun = (
    item: ItemPropTypes,
    position: 'top' | 'bottom' | undefined,
    descr: string,
  ) => {
    return (
      <ConstructorElement
        text={`${item.name} ${descr}`}
        type={position}
        isLocked={true}
        price={item.price}
        thumbnail={item.image}
      />
    );
  };

  const onOrderClick = async () => {
    if (userCurrentLoggedIn) {
      await dispatch(
        postOrderUser(
          orderCurrentList.map((product: ProductPropType) => {
            return product._id;
          }),
        ),
      );
      dispatch(clearOrderList());
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (status === 'success' && orderCurrentInProgress !== null) {
      navigate(`/current-order/${orderCurrentInProgress.order.number}`);
    }
  }, [status, orderCurrentInProgress, navigate]);

  useEffect(() => {
    dispatch(addToOrderList([bunCurrent, bunCurrent, ...ingredientsCurrent]));
  }, [bunCurrent, ingredientsCurrent, dispatch, orderCurrentInProgress]);

  useEffect(() => {
    if (bunCurrent !== null) {
      getOrderPrice();
    }
  }, [orderCurrentList]);

  return (
    <section className={`${style.section}`} ref={dropBun}>
      {bunCurrent !== null ? (
        <ul className={`${style.section__list}  pl-4 pr-4 `}>
          <li className={`${style.section__item}`}>{getMainBun(bunCurrent, 'top', '(верх)')}</li>

          <div
            className={`${style.section__content} ${
              ingredientsCurrent.length === 0 ? style.section__content__empty : ''
            } mt-4 mb-4`}
            ref={dropIngredients}
          >
            {ingredientsCurrent.length === 0 ? (
              <h3 className={`${style.section__title}  text text_type_main-large`}>
                ...а любимые ингредиенты - сюда
              </h3>
            ) : (
              ingredientsCurrent.map(
                (item: ItemPropTypes, index: number) =>
                  item.type !== 'bun' && (
                    <ConstructorIngredient ingredient={item} index={index} key={item.removeId} />
                  ),
              )
            )}
          </div>

          <li className={`${style.section__item}`}>{getMainBun(bunCurrent, 'bottom', '(низ)')}</li>
        </ul>
      ) : (
        <h3 className={`${style.section__title} text text_type_main-large`}>
          Перенеси понравившуюся булку сюда...
        </h3>
      )}

      <div className={`${style.section__order} pr-4`}>
        <div className={`${style.section__price} pr-10`}>
          <p className='text text_type_main-large pr-4'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={onOrderClick}
          disabled={orderCurrentList.length < 3 ? true : false}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
