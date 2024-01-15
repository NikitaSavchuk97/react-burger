import style from './ProductList.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProductListPropTypes, ItemPropTypes } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredientDetails } from '../../redux/slices/ingredientDetailsSlice';
import { openModal } from '../../redux/slices/modalSlice';
import { useDrag } from 'react-dnd';

function ProductList(props: ProductListPropTypes) {
  const dispatch = useDispatch();
  const { orderCurrentList } = useSelector((state: any) => state.ingredientsCurrentSlice);
  const { ingredients } = useSelector((state: any) => state.ingredientsSlice);
  const onItemClick = (e: any) => {
    const targetElement = e.target.closest('section');
    const itemData = ingredients.find((item: ItemPropTypes) => item._id === targetElement.id);
    dispatch(addIngredientDetails(itemData));
    dispatch(openModal({ type: 'ingredient', title: 'Детали ингридиента' }));
  };

  const DraggableItem: any = ({ item, amount }: { item: any; amount: number }) => {
    const [{ isDrag }, dragRef] = useDrag({
      type: 'sauce',
      item: item,

      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });

    return (
      !isDrag && (
        <section
          ref={dragRef}
          className={`${style.grid__item}`}
          key={item._id}
          id={item._id}
          onClick={onItemClick}
        >
          {amount > 0 && <p className='text text_type_digits-default pt-1 pb-1'>{amount}</p>}
          <img src={item.image} alt={item.name} />
          <b className='text text_type_digits-default pt-1 pb-1'>
            {item.price} <CurrencyIcon type='primary' />
          </b>
          <h5 className='text text_type_main-default pb-5'>{item.name}</h5>
        </section>
      )
    );
  };

  return (
    <section id={props.id} ref={props.refProp}>
      <h3 className='text text_type_main-medium'>{props.title}</h3>
      <div className={`${style.grid} pt-6 pl-4 pb-10 pr-4`}>
        {ingredients.map((item: any) => {
          let amount: number = 0;
          orderCurrentList.forEach((element: any) => {
            if (element._id === item._id) {
              amount = element.type === 'bun' ? 2 : amount + 1;
            }
          });
          return (
            item.type === props.type && <DraggableItem key={item._id} item={item} amount={amount} />
          );
        })}
      </div>
    </section>
  );
}

export default ProductList;
