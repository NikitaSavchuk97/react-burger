import axios from 'axios';
import style from './App.module.scss';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';

import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { ItemPropTypes } from '../../utils/types';

function App() {
  const [modalInfo, setModalInfo] = useState<any>({
    title: null,
    type: null,
    data: null,
  });
  const { isModalOpen, openModal, closeModal } = useModal();
  const [ingredients, setIngredients] = useState<Array<ItemPropTypes>>([]);
  const BASE_URL = 'https://norma.nomoreparties.space';

  const getIngredients = () => {
    axios
      .get(`${BASE_URL}/api/ingredients`)
      .then((res) => {
        setIngredients(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    closeModal();
    setModalInfo({
      title: null,
      type: null,
      data: null,
    });
  };

  const handleOpenModal = ({ type, id }: { type: string; id: string }) => {
    const itemData = ingredients.find((item) => item._id === id);
    const title = type === 'ingredient' ? 'Детали ингридиента' : '';
    setModalInfo({ title: title, type: type, data: itemData });
    openModal();
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <section className={`${style.app} pt-10 pb-10`}>
      <AppHeader />
      <main className={style.app__wrapper}>
        <BurgerIngredients ingredients={ingredients} openModal={handleOpenModal} />
        <BurgerConstructor ingredients={ingredients} openModal={handleOpenModal} />
      </main>

      {isModalOpen && (
        <Modal title={modalInfo.title} closeModal={handleCloseModal}>
          {modalInfo.type === 'ingredient' ? (
            <IngredientDetails modalInfo={modalInfo} />
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </section>
  );
}

export default App;
