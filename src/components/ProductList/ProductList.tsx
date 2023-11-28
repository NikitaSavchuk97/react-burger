import style from './ProductList.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProductListPropTypes } from '../../utils/types';

function ProductList(props: ProductListPropTypes) {
  const onItemClick = (e: any) => {
    const targetElement = e.target.closest('section');
    props.openModal({ type: 'ingredient', id: targetElement.id });
  };

  return (
    <section id={props.id}>
      <h3 className='text text_type_main-medium'>{props.title}</h3>
      <div className={`${style.grid} pt-6 pl-4 pb-10 pr-4`}>
        {props.ingredients.map(
          (item) =>
            item.type === props.type && (
              <section
                className={`${style.grid_item}`}
                key={item._id}
                id={item._id}
                onClick={onItemClick}
              >
                <img src={item.image} alt={item.name} />
                <b className='text text_type_digits-default pt-1 pb-1'>
                  {item.price} <CurrencyIcon type='primary' />
                </b>
                <h5 className='text text_type_main-default pb-5'>{item.name}</h5>
              </section>
            ),
        )}
      </div>
    </section>
  );
}

export default ProductList;
