import Modal from '../Modal/Modal';
import style from './App.module.scss';
import AppHeader from '../AppHeader/AppHeader';
import OrderDetails from '../OrderDetails/OrderDetails';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ProfileInputs from '../ProfileInputs/ProfileInputs';
import ProfileOrders from '../ProfileOrders/ProfileOrders';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import CenterElements from '../CenterElements/CenterElements';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ForgotFirstPage from '../../pages/ForgotFirstPage/ForgotFirstPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ForgotSecondPage from '../../pages/ForgotSecondPage/ForgotSecondPage';

import { FC, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getCurrentUser } from '../../redux/actions/getCurrentUser';
import { getIngredients } from '../../redux/actions/getIngredients';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { removeIngredientDetails } from '../../redux/slices/ingredientDetailsSlice';
import OrdersPage from '../../pages/OrdersPage/OrdersPage';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { ingredients } = useSelector((state) => state.ingredientsSlice);
  const background = location.state && location.state?.background?.pathname;
  const statusIngredients = useSelector((state) => state.ingredientsSlice.status);

  const handleCloseModal = () => {
    navigate(-1);
    dispatch(removeIngredientDetails());
  };

  useEffect(() => {
    dispatch(getCurrentUser());

    if (ingredients === null) {
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
						
            <Route path='/feed' element={<OrdersPage />}>
              <Route index element={<ProfileInputs />} />
              <Route path=':id' element={<ProfileInputs />} />
            </Route>

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
              path='/current-order/:id'
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
};

export default App;
