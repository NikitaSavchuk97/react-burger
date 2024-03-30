import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { JSXElementConstructor, useEffect } from 'react';

function ProtectedRoute({ element }: { element: any }) {
  const location = useLocation().pathname;
  const { userCurrentLoggedIn, userCurrentForgotPassServerAnswer } = useSelector(
    (state: any) => state.userCurrentSlice,
  );

  console.log('ПОЛЬЗОВАТЕЛЬ === ', userCurrentLoggedIn);

  if (
    userCurrentLoggedIn &&
    (location === '/reset-password' ||
      location === '/forgot-password' ||
      location === '/login' ||
      location === '/register')
  ) {
    return <Navigate to='/' />;
  }

  if (
    !userCurrentLoggedIn &&
    !userCurrentForgotPassServerAnswer &&
    location === '/reset-password'
  ) {
    return <Navigate to='/forgot-password' />;
  }

  if (!userCurrentLoggedIn && (location === '/profile' || location === '/profile/orders')) {
    return <Navigate to='/login' />;
  }

  return element;
}

export default ProtectedRoute;
