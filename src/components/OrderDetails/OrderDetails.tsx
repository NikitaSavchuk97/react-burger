import style from './OrderDetails.module.scss';
import doneSvg from '../../images/doneSvg.svg';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const { orderCurrentInProgress } = useSelector((state: any) => state.ingredientsCurrentSlice);

  // const current = useMemo(() => {
  //   if (orderCurrentInProgress !== null) {
  //     return orderCurrentInProgress;
  //   } else if (params && ingredients && ingredients.length > 0) {
  //     return ingredients.find((i: any) => i._id === params);
  //   }
  //   return null;
  // }, [ingredients, params, ingredients]);

  return orderCurrentInProgress ? (
    <section className={`${style.container}`}>
      <h2 className={`${style.container__title} pb-2 text text_type_digits-large`}>
        {orderCurrentInProgress.order.number}
      </h2>
      <h4 className='pb-15 text text_type_main-medium'>идентификатор заказа</h4>
      <div className={`${style.container__icon} pb-10`}>
        <img src={doneSvg} alt='Заказ принят' />
      </div>
      <h5 className=' pb-2 text text_type_main-default'>Ваш заказ начали готовить</h5>
      <b className={`${style.container__subtitle} text text_type_main-default`}>
        Дождитель готовности на орбитальной станции
      </b>
    </section>
  ) : (
    <h1>нет активного заказа</h1>
  );
}

export default OrderDetails;
