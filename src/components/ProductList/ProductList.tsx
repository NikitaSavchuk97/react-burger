import style from './ProductList.module.scss';
import { FC } from 'react';
import DraggableItem from '../DraggableItem/DraggableItem';

import { MouseEventHandler } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import { ProductListPropTypes, ItemPropTypes } from '../../utils/types';
import { addIngredientDetails } from '../../redux/slices/ingredientDetailsSlice';

const ProductList: FC<ProductListPropTypes> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { orderCurrentList } = useSelector((state) => state.ingredientsCurrentSlice);
  const { ingredients } = useSelector((state) => state.ingredientsSlice);

  const onItemGrab: MouseEventHandler<HTMLElement> = (e) => {
    const targetElement = (e.target as Element).closest('section');
    if (targetElement && ingredients !== null) {
      const itemData = ingredients.find((item: ItemPropTypes) => item._id === targetElement.id);
      if (itemData) {
        dispatch(addIngredientDetails(itemData));
      }
    }
  };

  return (
    <section id={props.id} ref={props.refProp}>
      <h3 className='text text_type_main-medium'>{props.title}</h3>
      <div className={`${style.grid} pt-6 pl-4 pb-10 pr-4`}>
        {ingredients &&
          ingredients.map((item: ItemPropTypes) => {
            let amount: number = 0;
            if (orderCurrentList.length < 2) {
              orderCurrentList.forEach((element: ItemPropTypes) => {
                if (element._id === item._id) {
                  amount = element.type === 'bun' ? 2 : amount + 1;
                }
              });
            }
            return (
              item.type === props.type && (
                <Link
                  className={style.grid__link}
                  key={item._id}
                  to={`/ingredient/${item._id}`}
                  state={{ background: location }}
                >
                  <DraggableItem item={item} amount={amount} onItemGrab={onItemGrab} />
                </Link>
              )
            );
          })}
      </div>
    </section>
  );
};

export default ProductList;
