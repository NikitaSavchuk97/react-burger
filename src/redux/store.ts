import axios from 'axios';
import webSocketSlice from './slices/webSocketSlice';
import userCurrentSlice from './slices/userCurrentSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import orderDetailsSlice from './slices/orderDetailsSlice';
import ingredientDetailsSlice from './slices/ingredientDetailsSlice';
import ingredientsCurrentSlice from './slices/ingredientsCurrentSlice';

import { AnyAction, combineReducers } from 'redux';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from '../middleware/webSocketMiddleware';
import {
  onMessageAllOrders,
  onOpenAllOrders,
  onErrorAllOrders,
  onCloseAllOrders,
  onOpenUserOrders,
  onErrorUserOrders,
  onMessageUserOrders,
  onCloseUserOrders,
} from '../redux/slices/webSocketSlice';

export const webSocketUrl: string = 'wss://norma.nomoreparties.space/orders';
export const instance = axios.create({
  baseURL: 'https://norma.nomoreparties.space',
  timeout: 30000,
});

export const rootReducer = combineReducers({
  orderDetailsSlice: orderDetailsSlice,
  ingredientsSlice: ingredientsSlice,
  ingredientsCurrentSlice: ingredientsCurrentSlice,
  ingredientDetailsSlice: ingredientDetailsSlice,
  userCurrentSlice: userCurrentSlice,
  webSocketSlice: webSocketSlice,
});

const allOrdersHandlers = {
  webSocketUrl: `${webSocketUrl}/all`,
  connectActionType: 'webSocket/onConnectAllOrders',
  openAction: () => store.dispatch(onOpenAllOrders()),
  errorAction: () => store.dispatch(onErrorAllOrders()),
  messageAction: (data: string) => store.dispatch(onMessageAllOrders(data)),
  closeAction: () => store.dispatch(onCloseAllOrders()),
};

const userOrdersHandlers = {
  cookieName: 'accessToken',
  webSocketType: 'userData',
  webSocketUrl: `${webSocketUrl}?token=`,
  connectActionType: 'webSocket/onConnectUserOrders',
  openAction: () => store.dispatch(onOpenUserOrders()),
  errorAction: () => store.dispatch(onErrorUserOrders()),
  messageAction: (data: string) => store.dispatch(onMessageUserOrders(data)),
  closeAction: () => store.dispatch(onCloseUserOrders()),
};

const middlewares = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(
    socketMiddleware(allOrdersHandlers),
    socketMiddleware(userOrdersHandlers),
  );

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

//export type RootState = ReturnType<typeof rootReducer>;
//export type AppDispatch = typeof store.dispatch;
