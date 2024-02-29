import style from './BurgerConstructor.module.scss';
import { BurgerConstructorPropTypes, ItemPropTypes, ProductPropType } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { postOrder } from '../../redux/actions/postOrder';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  addBunCurrent,
  addToOrderList,
  clearOrderList,
  addIngredientsCurrent,
  removeIngredientsCurrent,
  setTotalPrice,
} from '../../redux/slices/ingredientsCurrentSlice';
import { useEffect } from 'react';

function BurgerConstructor(props: BurgerConstructorPropTypes) {
  const dispatch = useDispatch<any>();

  const { bunCurrent, ingredientsCurrent, orderCurrentList, totalPrice } = useSelector(
    (state: any) => state.ingredientsCurrentSlice,
  );

  const getOrderPrice = () => {
    const mainPrice = orderCurrentList.reduce((acc: any, curr: any) => acc + curr.price, 0);
    dispatch(setTotalPrice(mainPrice));
  };

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

  const [, dropBun] = useDrop({
    accept: ['bun', 'sauce'],
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

  const handleRemoveClick = (e: string) => {
    dispatch(removeIngredientsCurrent(e));
  };

  const onOrderClick = () => {
    dispatch(
      postOrder(
        orderCurrentList.map((product: ProductPropType) => {
          return product._id;
        }),
      ),
    );
    dispatch(clearOrderList());
    props.openModal({ type: 'order', id: '' });
  };

  useEffect(() => {
    dispatch(addToOrderList([bunCurrent, bunCurrent, ...ingredientsCurrent]));
  }, [bunCurrent, ingredientsCurrent, dispatch]);

  useEffect(() => {
    if (bunCurrent.length !== 0) {
      getOrderPrice();
    }
  }, [orderCurrentList]);

  return (
    <section className={`${style.section}`} ref={dropBun}>
      {bunCurrent.length !== 0 ? (
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
                (item: ItemPropTypes) =>
                  item.type !== 'bun' && (
                    <li className={`${style.section__item} pr-3`} key={item.removeId}>
                      <DragIcon type={'primary'} />
                      <ConstructorElement
                        handleClose={() => handleRemoveClick(item.removeId)}
                        extraClass={style.section__element}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                      />
                    </li>
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
}

export default BurgerConstructor;
