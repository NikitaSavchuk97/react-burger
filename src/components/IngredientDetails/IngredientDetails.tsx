import { ItemPropTypes } from '../../utils/types';
import style from './IngredientDetails.module.scss';
import { useSelector, useDispatch } from 'react-redux';

interface IngredientDetailsPropTypes {
  modalInfo: { type: string; data: ItemPropTypes };
}

function IngredientDetails() {
  const { ingredientDetails } = useSelector((state: any) => state.ingredientDetailsSlice);

  return (
    <section className={style.container}>
      <img className='pb-4' src={ingredientDetails.image} alt={ingredientDetails.name} />
      <h3 className={`${style.container__title} pb-8 text text_type_main-default`}>
        {ingredientDetails.name}
      </h3>

      <div>
        <ul className={style.container__list}>
          <li className={`${style.container__list_item} pr-5`}>
            <h5 className=' text text_type_main-default pb-1'>Калории,ккал</h5>
            <b className='text text_type_digits-default'>{ingredientDetails.calories}</b>
          </li>

          <li className={`${style.container__list_item} pr-5`}>
            <h5 className=' text text_type_main-default'>Белки,г</h5>
            <b className='text text_type_digits-default'>{ingredientDetails.proteins}</b>
          </li>

          <li className={`${style.container__list_item} `}>
            <h5 className='text text_type_main-default'>Жиры,г</h5>
            <b className='text text_type_digits-default'>{ingredientDetails.fat}</b>
          </li>

          <li className={`${style.container__list_item} pl-5`}>
            <h5 className=' text text_type_main-default'>Углеводы,г</h5>
            <b className='text text_type_digits-default'>{ingredientDetails.carbohydrates}</b>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default IngredientDetails;
