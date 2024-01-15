import ProductList from '../ProductList/ProductList';
import style from './BurgerIngredients.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useDispatch} from 'react-redux';
import { getIngredients } from '../../redux/slices/ingredientsSlice';

function BurgerIngredients() {
  const dispatch = useDispatch<any>();

  const buns = useRef<HTMLInputElement>(null);
  const sauces = useRef<HTMLInputElement>(null);
  const mains = useRef<HTMLInputElement>(null);

  const [bunsCoords, setBunsCoords] = useState<number>(320);
  const [saucesCoords, setSaucesCoords] = useState<number>(620);
  const [mainsCoords, setMainsCoords] = useState<number>(340);

  const getListCoords = () => {
    //Пожалуйста, подскажите как нормально реализовать скролл с применением стилей к навигации в зависимости от координат/видимости элемента на странице.
    //Пока-что реализовал через юзСтейт, позже, когда будет нормальная реализация - перенесу в редукс.
    setBunsCoords(buns!.current!.getBoundingClientRect().top);
    setSaucesCoords(sauces!.current!.getBoundingClientRect().top);
    setMainsCoords(mains!.current!.getBoundingClientRect().top);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <section className={`${style.section}`}>
      <h1 className={`text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>

      <nav className='pb-10'>
        <ul className={`${style.section__navigation}`}>
          <li>
            <a
              className={`${style.section__navigation_item} ${
                bunsCoords > 30 && bunsCoords < 330 ? style.section__navigation_item_active : ''
              } text text_type_main-default`}
              href='#bun'
            >
              Булки
            </a>
          </li>
          <li>
            <a
              className={`${style.section__navigation_item} ${
                saucesCoords > -210 && saucesCoords < 615
                  ? style.section__navigation_item_active
                  : ''
              } text text_type_main-default`}
              href='#sauce'
            >
              Соусы
            </a>
          </li>
          <li>
            <a
              className={`${style.section__navigation_item} ${
                mainsCoords < 330 ? style.section__navigation_item_active : ''
              } text text_type_main-default`}
              href='#main'
            >
              Начинки
            </a>
          </li>
        </ul>
      </nav>

      <div className={`${style.section__content}`} onScroll={getListCoords}>
        <ProductList title='Булки' type='bun' id='bun' refProp={buns} />
        <ProductList title='Соусы' type='sauce' id='sauce' refProp={sauces} />
        <ProductList title='Начинки' type='main' id='main' refProp={mains} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
