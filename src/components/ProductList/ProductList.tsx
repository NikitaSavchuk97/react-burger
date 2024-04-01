import style from './ProductList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredientDetails } from '../../redux/slices/ingredientDetailsSlice';
import { ProductListPropTypes, ItemPropTypes } from '../../utils/types';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import DraggableItem from '../DraggableItem/DraggableItem';

function ProductList(props: ProductListPropTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { orderCurrentList } = useSelector((state: any) => state.ingredientsCurrentSlice);
  const { ingredients } = useSelector((state: any) => state.ingredientsSlice);

  const onItemGrab = (e: any) => {
    const targetElement = e.target.closest('section');
    const itemData = ingredients.find((item: ItemPropTypes) => item._id === targetElement.id);
    dispatch(addIngredientDetails(itemData));
    //props.openModal({ type: 'ingredient', id: targetElement.id });
    props.openModal();
    navigate(`/ingredient/${targetElement.id}`);
  };

  return (
    <section id={props.id} ref={props.refProp}>
      <h3 className='text text_type_main-medium'>{props.title}</h3>
      <div className={`${style.grid} pt-6 pl-4 pb-10 pr-4`}>
        {ingredients.map((item: ItemPropTypes) => {
          let amount: number = 0;
          orderCurrentList.forEach((element: ItemPropTypes) => {
            if (element._id === item._id) {
              amount = element.type === 'bun' ? 2 : amount + 1;
            }
          });
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
}

export default ProductList;
