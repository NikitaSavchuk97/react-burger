import Modal from '../Modal/Modal';
import style from './App.module.scss';
import Loader from '../Loader/Loader';
import AppHeader from '../AppHeader/AppHeader';
import OrdersFeed from '../OrdersFeed/OrdersFeed';
import OrdersList from '../OrdersList/OrdersList';
import OrderCurrent from '../OrderCurrent/OrderCurrent';
import OrderDetails from '../OrderDetails/OrderDetails';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ProfileInputs from '../ProfileInputs/ProfileInputs';
import OrdersPage from '../../pages/OrdersPage/OrdersPage';
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
import { clearOrderList } from '../../redux/slices/ingredientsCurrentSlice';
import { removeIngredientDetails } from '../../redux/slices/ingredientDetailsSlice';

//import { RootState } from '../../redux/store';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state?.background?.pathname;

  //const takeIngredients = (state: RootState) => state.ingredientsSlice;
	//const { ingredients } = useSelector(takeIngredients);
	
  const { ingredients } = useSelector((state) => state.ingredientsSlice);
  const { userCurrentLoggedIn } = useSelector((state) => state.userCurrentSlice);

  const handleCloseModal = () => {
    navigate(-1);
    dispatch(removeIngredientDetails());
    dispatch(clearOrderList());
  };

  useEffect(() => {
    dispatch(getCurrentUser());

    if (ingredients === null) {
      dispatch(getIngredients());
    }
  }, [userCurrentLoggedIn]);

  return (
    <section className={`${style.app} pt-10 pb-10`}>
      <AppHeader />
      {ingredients ? (
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
              <Route index element={<OrdersFeed />} />
              <Route
                path=':id'
                element={
                  <CenterElements>
                    <OrderDetails />
                  </CenterElements>
                }
              />
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
              <Route index element={<ProfileInputs />} />
              <Route path='orders' element={<OrdersList />} />
            </Route>

            <Route
              path='/profile/orders/:id'
              element={
                <CenterElements>
                  <OrderDetails />
                </CenterElements>
              }
            />

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
              path='/current-order'
              element={
                <Modal title='Обработка заказа' closeModal={handleCloseModal}>
                  <OrderCurrent />
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

              <Route
                path='/feed/:id'
                element={
                  <Modal title='Детали заказа' closeModal={handleCloseModal}>
                    <OrderDetails />
                  </Modal>
                }
              />

              <Route
                path='/profile/orders/:id'
                element={
                  <Modal title='Детали заказа' closeModal={handleCloseModal}>
                    <OrderDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      ) : (
        <CenterElements>
          <Loader />
        </CenterElements>
      )}
    </section>
  );
};

export default App;
