import axios from 'axios';
import style from './App.module.scss';
import AppHeader from '../appHeader/AppHeader';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import Modal from '../modal/Modal';

import IngredientDetails from '../ingredientDetails/IngredientDetails';
import OrderDetails from '../orderDetails/OrderDetails';
import { useEffect, useState } from 'react';
import { ItemPropTypes } from '../../utils/types';

function App() {
  const [modalInfo, setModalInfo] = useState<any>({
    title: null,
    type: null,
    data: null,
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Array<ItemPropTypes>>([]);
  const BASE_URL = 'https://norma.nomoreparties.space';

  const getIngredients = () => {
    axios
      .get(`${BASE_URL}/api/ingredients`)
      .then((res) => {
        setIngredients(res.data.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalInfo({
      title: null,
      type: null,
      data: null,
    });
  };

  const openModal = ({ type, id }: { type: string; id: string }) => {
    const itemData = ingredients.find((item) => item._id === id);
    const title = type === 'ingredient' ? 'Детали ингридиента' : '';
    setModalInfo({ title: title, type: type, data: itemData });
    setModalVisible(true);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <section className={`${style.app} pt-10 pb-10`}>
      <AppHeader />
      <main className={style.app__wrapper}>
        <BurgerIngredients ingredients={ingredients} openModal={openModal} />
        <BurgerConstructor ingredients={ingredients} openModal={openModal} />
      </main>

      {modalVisible && (
        <Modal title={modalInfo.title} closeModal={closeModal}>
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
