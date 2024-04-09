import style from './App.module.scss';

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
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getIngredients } from '../../redux/actions/getIngredients';
import LoginPage from '../../pages/LoginPage/LoginPage';
import CenterElements from '../CenterElements/CenterElements';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ForgotFirstPage from '../../pages/ForgotFirstPage/ForgotFirstPage';
import ForgotSecondPage from '../../pages/ForgotSecondPage/ForgotSecondPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProfileInputs from '../ProfileInputs/ProfileInputs';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProfileOrders from '../ProfileOrders/ProfileOrders';
import { getCurrentUser } from '../../redux/actions/getCurrentUser';

function App() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state?.background?.pathname;
  const { ingredients } = useSelector((state: any) => state.ingredientsSlice);
  const statusIngredients = useSelector((state: any) => state.ingredientsSlice.status);

  const handleCloseModal = () => {
    navigate(-1);
    dispatch(removeIngredientDetails());
  };

  useEffect(() => {
    dispatch(getCurrentUser());

    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, []);

  return (
    <section className={`${style.app} pt-10 pb-10`}>
      <AppHeader />
      {statusIngredients !== 'loading' ? (
        <>
          <Routes location={background || location}>
            <Route
              path='/'
              element={
                <main className={style.app__wrapper}>
                  <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </DndProvider>
                </main>
              }
            />
            <Route
              path='/orders'
              element={
                <CenterElements>
                  <h1>ЛЕНТА ЗАКАЗОВ</h1>
                </CenterElements>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  element={
                    <CenterElements>
                      <ProfilePage />
                    </CenterElements>
                  }
                />
              }
            >
              <Route path='' element={<ProfileInputs />} />
              <Route path='orders' element={<ProfileOrders />}>
                <Route path=':Id' element={<ProfileOrders />} />
              </Route>
            </Route>
            <Route
              path='/login'
              element={
                <ProtectedRoute
                  anonymous
                  element={
                    <CenterElements>
                      <LoginPage />
                    </CenterElements>
                  }
                />
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute
                  anonymous
                  element={
                    <CenterElements>
                      <RegistrationPage />
                    </CenterElements>
                  }
                />
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute
                  anonymous
                  element={
                    <CenterElements>
                      <ForgotFirstPage />
                    </CenterElements>
                  }
                />
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute
                  anonymous
                  element={
                    <CenterElements>
                      <ForgotSecondPage />
                    </CenterElements>
                  }
                />
              }
            />

            <Route
              path='/feed/:id'
              element={
                <Modal title='Детали заказа' closeModal={handleCloseModal}>
                  <OrderDetails />
                </Modal>
              }
            />

            <Route
              path='/ingredient/:id'
              element={
                <CenterElements>
                  <IngredientDetails />
                </CenterElements>
              }
            />
          </Routes>
          {background && (
            <Routes>
              <Route
                path='/ingredient/:id'
                element={
                  <Modal title='Детали ингредиента' closeModal={handleCloseModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      ) : (
        <CenterElements>
          <h1>ЗАГРУЗКА</h1>
        </CenterElements>
      )}
    </section>
  );
}

export default App;
