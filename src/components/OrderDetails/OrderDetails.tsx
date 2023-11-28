import style from './OrderDetails.module.scss';
import doneSvg from '../../images/doneSvg.svg';

function OrderDetails() {
  return (
    <section className={`${style.container}`}>
      <h2 className={`${style.container__title} pb-2 text text_type_digits-large`}>123456</h2>
      <h4 className='pb-15 text text_type_main-medium'>идентификатор заказа</h4>
      <div className={`${style.container__icon} pb-10`}>
        <img src={doneSvg} alt='Заказ принят' />
      </div>
      <h5 className=' pb-2 text text_type_main-default'>Ваш заказ начали готовить</h5>
      <b className={`${style.container__subtitle} text text_type_main-default`}>
        Дождитель готовности на орбитальной станции
      </b>
    </section>
  );
}

export default OrderDetails;
