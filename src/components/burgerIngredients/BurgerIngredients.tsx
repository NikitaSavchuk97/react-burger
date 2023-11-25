import ProductList from '../productList/ProductList';
import style from './BurgerIngredients.module.scss';
import { BurgerIngredientsPropTypes } from '../../utils/types';

function BurgerIngredients(props: BurgerIngredientsPropTypes) {
  return (
    <section className={`${style.section}`}>
      <h1 className={`text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>

      <nav className='pb-10'>
        <ul className={`${style.section__navigation}`}>
          <li>
            <a
              className={`${style.section__navigation_item} ${style.section__navigation_item_active} text text_type_main-default`}
              href='#bun'
            >
              Булки
            </a>
          </li>
          <li>
            <a
              className={`${style.section__navigation_item} text text_type_main-default`}
              href='#sauce'
            >
              Соусы
            </a>
          </li>
          <li>
            <a
              className={`${style.section__navigation_item} text text_type_main-default`}
              href='#main'
            >
              Начинки
            </a>
          </li>
        </ul>
      </nav>

      <div className={`${style.section__content}`}>
        <ProductList
          title='Булки'
          type='bun'
          id='bun'
          ingredients={props.ingredients}
          openModal={props.openModal}
        />
        <ProductList
          title='Соусы'
          type='sauce'
          id='sauce'
          ingredients={props.ingredients}
          openModal={props.openModal}
        />
        <ProductList
          title='Начинки'
          type='main'
          id='main'
          ingredients={props.ingredients}
          openModal={props.openModal}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
