import { WebSocketPropTypes } from '../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WebSocketPropTypes = {
  socketUserOrders: null,
  socketAllOrders: null,
  socketTotalOrders: null,
  socketTotalTodayOrders: null,
};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    // App WebSocket ================================================
    onConnectAllOrders() {
      console.log('ДАННЫЕ ПРИЛОЖЕНИЯ: Попытка подключения к серверу');
    },
    onErrorAllOrders() {
      console.log('ДАННЫЕ ПРИЛОЖЕНИЯ: Ошибка при подключении серверу');
    },
    onOpenAllOrders() {
      console.log('ДАННЫЕ ПРИЛОЖЕНИЯ: Подключено к серверу');
    },
    onMessageAllOrders(state, action: PayloadAction<string>) {
      console.log('ДАННЫЕ ПРИЛОЖЕНИЯ: Получение данных с сервера');
      const data = JSON.parse(action.payload);
      state.socketAllOrders = data.orders;
      state.socketTotalOrders = data.total;
      state.socketTotalTodayOrders = data.totalToday;
    },
    onCloseAllOrders(state) {
      console.log('ДАННЫЕ ПРИЛОЖЕНИЯ: Соединение с сервером закрыто');
      state.socketAllOrders = null;
      state.socketTotalOrders = null;
      state.socketTotalTodayOrders = null;
    },

    // User WebSocket ================================================
    onConnectUserOrders() {
      console.log('ДАННЫЕ ПОЛЬЗОВАТЕЛЯ: Попытка подключения к серверу');
    },
    onErrorUserOrders() {
      console.log('ДАННЫЕ ПОЛЬЗОВАТЕЛЯ: Ошибка при подключении серверу');
    },
    onOpenUserOrders() {
      console.log('ДАННЫЕ ПОЛЬЗОВАТЕЛЯ: Подключено к серверу');
    },
    onMessageUserOrders(state, action: PayloadAction<string>) {
      console.log('ДАННЫЕ ПОЛЬЗОВАТЕЛЯ: Получение данных с сервера');
      const data = JSON.parse(action.payload);
      state.socketUserOrders = data?.orders?.reverse();
    },
    onCloseUserOrders(state) {
      console.log('ДАННЫЕ ПОЛЬЗОВАТЕЛЯ: Соединение с сервером закрыто');
      state.socketUserOrders = null;
    },
  },
});

export const {
  onConnectAllOrders,
  onOpenAllOrders,
  onErrorAllOrders,
  onMessageAllOrders,
  onCloseAllOrders,
  onConnectUserOrders,
  onOpenUserOrders,
  onErrorUserOrders,
  onMessageUserOrders,
  onCloseUserOrders,
} = webSocketSlice.actions;

export default webSocketSlice.reducer;
