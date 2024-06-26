import style from './IngredientDetails.module.scss';

import { FC, useMemo } from 'react';
import { useLocation } from 'react-router';
import { ItemPropTypes } from '../../utils/types';
import { useSelector } from '../../hooks/useReduxToolkit';

const IngredientDetails: FC = () => {
  const params = useLocation().pathname.split('/ingredient/')[1];

  const { ingredientDetails } = useSelector((state) => state.ingredientDetailsSlice);
  const { ingredients } = useSelector((state) => state.ingredientsSlice);

  const current = useMemo(() => {
    if (ingredientDetails !== null) {
      return ingredientDetails as ItemPropTypes;
    } else if (params && ingredients && ingredients.length > 0) {
      return ingredients.find((item: ItemPropTypes) => item._id === params) as ItemPropTypes;
    }
    return null;
  }, [ingredients, params, ingredients]);

  return current ? (
    <section className={style.container}>
      <img className='pb-4' src={current.image} alt={current.name} />
      <h3 className={`${style.container__title} pb-8 text text_type_main-default`}>
        {current.name}
      </h3>

      <div>
        <ul className={style.container__list}>
          <li className={`${style.container__list_item} pr-5`}>
            <h5 className=' text text_type_main-default pb-1'>Калории,ккал</h5>
            <b className='text text_type_digits-default'>{current.calories}</b>
          </li>

          <li className={`${style.container__list_item} pr-5`}>
            <h5 className=' text text_type_main-default'>Белки,г</h5>
            <b className='text text_type_digits-default'>{current.proteins}</b>
          </li>

          <li className={`${style.container__list_item} `}>
            <h5 className='text text_type_main-default'>Жиры,г</h5>
            <b className='text text_type_digits-default'>{current.fat}</b>
          </li>

          <li className={`${style.container__list_item} pl-5`}>
            <h5 className=' text text_type_main-default'>Углеводы,г</h5>
            <b className='text text_type_digits-default'>{current.carbohydrates}</b>
          </li>
        </ul>
      </div>
    </section>
  ) : (
    <h1>ингредиента с ID:{params} не существует</h1>
  );
};

export default IngredientDetails;
