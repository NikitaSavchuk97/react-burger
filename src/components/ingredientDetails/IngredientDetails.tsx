import { ItemPropTypes } from '../../utils/types';
import style from './IngredientDetails.module.scss';

interface IngredientDetailsPropTypes {
  modalInfo: { type: string; data: ItemPropTypes };
}

function IngredientDetails(props: IngredientDetailsPropTypes) {
  return (
    <section className={style.container}>
      <img className='pb-4' src={props.modalInfo.data.image} alt={props.modalInfo.data.name} />
      <h3 style={{ textAlign: 'center' }} className='pb-8 text text_type_main-default'>
        {props.modalInfo.data.name}
      </h3>

      <div>
        <ul className={style.container__list}>
          <li className={`${style.container__list_item} pr-5`}>
            <h5 className=' text text_type_main-default pb-1'>Калории,ккал</h5>
            <b className='text text_type_digits-default'>{props.modalInfo.data.calories}</b>
          </li>

          <li className={`${style.container__list_item} pr-5`}>
            <h5 className=' text text_type_main-default'>Белки,г</h5>
            <b className='text text_type_digits-default'>{props.modalInfo.data.proteins}</b>
          </li>

          <li className={`${style.container__list_item} `}>
            <h5 className='text text_type_main-default'>Жиры,г</h5>
            <b className='text text_type_digits-default'>{props.modalInfo.data.fat}</b>
          </li>

          <li className={`${style.container__list_item} pl-5`}>
            <h5 className=' text text_type_main-default'>Углеводы,г</h5>
            <b className='text text_type_digits-default'>{props.modalInfo.data.carbohydrates}</b>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default IngredientDetails;
