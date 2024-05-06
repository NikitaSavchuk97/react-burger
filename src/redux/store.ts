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

export const webSocketUrl: string = 'wss://norma.nomoreparties.space/orders';
export const instance = axios.create({
  baseURL: 'https://norma.nomoreparties.space',
  timeout: 30000,
});

const rootReducer = combineReducers({
  orderDetailsSlice,
  ingredientsSlice,
  ingredientsCurrentSlice,
  ingredientDetailsSlice,
  userCurrentSlice,
  webSocketSlice,
});

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(socketMiddleware(webSocketUrl));

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

//export type RootState = ReturnType<typeof rootReducer>;
//export type AppDispatch = typeof store.dispatch;
