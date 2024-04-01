import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { JSXElementConstructor, useEffect } from 'react';

function ProtectedRoute({ element, anonymous = false }: { element: any; anonymous?: boolean }) {
  const location = useLocation();
  const from = location.state?.from || '/';
  const { userCurrentLoggedIn, userCurrentForgotPassServerAnswer } = useSelector(
    (state: any) => state.userCurrentSlice,
  );

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && userCurrentLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !userCurrentLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // Если неавторизованный пользователь, без успешного ответа от сервера смены пароля...
  if (
    anonymous &&
    !userCurrentLoggedIn &&
    !userCurrentForgotPassServerAnswer &&
    location.pathname === '/reset-password'
  ) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

export default ProtectedRoute;
