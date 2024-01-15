import style from './App.module.scss';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const { modalType, modal } = useSelector((state: any) => state.modalSlice);

  return (
    <section className={`${style.app} pt-10 pb-10`}>
      <AppHeader />

      <main className={style.app__wrapper}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>

      {modal && (
        <Modal>{modalType === 'ingredient' ? <IngredientDetails /> : <OrderDetails />}</Modal>
      )}
    </section>
  );
}

export default App;
