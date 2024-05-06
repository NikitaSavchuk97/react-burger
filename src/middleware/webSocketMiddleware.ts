import { getCookie } from '../utils/getCookie';
import type { Middleware, MiddlewareAPI } from 'redux';
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

export const socketMiddleware = (webSocketUrl: string): Middleware => {
  return (store: MiddlewareAPI) => (next) => (action) => {
    const { dispatch } = store;

    if (action.type === 'webSocket/onConnectAllOrders') {
      const socket = new WebSocket(`${webSocketUrl}/all`);
      socket.onerror = () => {
        dispatch(onErrorAllOrders());
      };
      socket.onopen = () => {
        dispatch(onOpenAllOrders());
      };
      socket.onmessage = (event) => {
        dispatch(onMessageAllOrders(event.data));
      };
      socket.onclose = function () {
        dispatch(onCloseAllOrders());
      };
    }

    if (action.type === 'webSocket/onConnectUserOrders') {
      const socket = new WebSocket(`${webSocketUrl}?token=${getCookie('accessToken')}`);
      socket.onerror = () => {
        dispatch(onErrorUserOrders());
      };
      socket.onopen = () => {
        dispatch(onOpenUserOrders());
      };
      socket.onmessage = (event) => {
        dispatch(onMessageUserOrders(event.data));
      };
      socket.onclose = function () {
        dispatch(onCloseUserOrders());
      };
    }

    next(action);
  };
};
