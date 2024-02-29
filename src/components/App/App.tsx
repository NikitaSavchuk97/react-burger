import style from './App.module.scss';

import useModal from '../../hooks/useModal';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { removeIngredientDetails } from '../../redux/slices/ingredientDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { IngredientPropType } from '../../utils/types';

function App() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state: any) => state.ingredientsSlice);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalInfo, setModalInfo] = useState<any>({
    title: null,
    type: null,
    data: null,
  });

  const handleCloseModal = () => {
    dispatch(removeIngredientDetails());
    setModalInfo({
      title: null,
      type: null,
      data: null,
    });
    closeModal();
	};

  const handleOpenModal = ({ type, id }: { type: string; id: string }) => {
    const itemData = ingredients.find((item: IngredientPropType) => item._id === id);
    const title = type === 'ingredient' ? 'Детали ингридиента' : '';
    setModalInfo({ title: title, type: type, data: itemData });
    openModal();
  };

  return (
    <section className={`${style.app} pt-10 pb-10`}>
      <AppHeader />

      <main className={style.app__wrapper}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openModal={handleOpenModal} />
          <BurgerConstructor openModal={handleOpenModal} />
        </DndProvider>
      </main>

      {isModalOpen && (
        <Modal title={modalInfo.title} closeModal={handleCloseModal}>
          {modalInfo.type === 'ingredient' ? <IngredientDetails /> : <OrderDetails />}
        </Modal>
      )}
    </section>
  );
}

export default App;
