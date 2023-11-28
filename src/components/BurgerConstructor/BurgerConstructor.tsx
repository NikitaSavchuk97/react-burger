import style from './BurgerConstructor.module.scss';
import bunSvg from '../../images/bunSvg.svg';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorPropTypes } from '../../utils/types';

function BurgerConstructor(props: BurgerConstructorPropTypes) {
  const onOrderClick = () => {
    props.openModal({ type: 'order', id: 'targetElement.id' });
  };

  return (
    <section className={`${style.section}`}>
      <div className={`${style.section__wrapper} pt-25 pl-4 pr-4 pb-10`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail={bunSvg}
        />
        <div className={`${style.section__content} mt-4 mb-4`}>
          {props.ingredients.map(
            (item) =>
              item.type !== 'bun' && (
                <ConstructorElement
                  key={item._id}
                  //type='bun'
                  //isLocked={true}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              ),
          )}
        </div>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail={bunSvg}
        />
      </div>

      <div className={`${style.section__order} pr-4`}>
        <div className={`${style.section__price} pr-10`}>
          <p className='text text_type_main-large pr-4'>610</p>
          <CurrencyIcon type='primary' />
        </div>

        <Button htmlType='button' type='primary' size='medium' onClick={onOrderClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
