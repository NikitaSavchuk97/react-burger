import type { Middleware } from 'redux';
import { getCookie } from '../utils/getCookie';
import { WebSocketActionHandlers } from '../utils/types';

export const socketMiddleware = (handlers: WebSocketActionHandlers): Middleware => {
  return () => (next) => (action) => {
    if (action.type === handlers.connectActionType) {
      const socket = new WebSocket(
        handlers.webSocketType
          ? handlers.webSocketUrl + getCookie(handlers.cookieName || '')
          : handlers.webSocketUrl,
      );
      socket.onerror = () => {
        handlers.errorAction();
      };
      socket.onopen = () => {
        handlers.openAction();
      };
      socket.onmessage = (event) => {
        handlers.messageAction(event.data);
      };
      socket.onclose = () => {
        handlers.closeAction();
      };
    } else {
      return next(action);
    }
  };
};

//Back-Up

// import { getCookie } from '../utils/getCookie';
// import type { Middleware, MiddlewareAPI } from 'redux';
// import {
//   onMessageAllOrders,
//   onOpenAllOrders,
//   onErrorAllOrders,
//   onCloseAllOrders,
//   onOpenUserOrders,
//   onErrorUserOrders,
//   onMessageUserOrders,
//   onCloseUserOrders,
// } from '../redux/slices/webSocketSlice';

// export const socketMiddleware = (webSocketUrl: string): Middleware => {
//   return (store: MiddlewareAPI) => (next) => (action) => {

//     const { dispatch } = store;

//     if (action.type === 'webSocket/onConnectAllOrders') {
//       const socket = new WebSocket(`${webSocketUrl}/all`);
//       socket.onerror = () => {
//         dispatch(onErrorAllOrders());
//       };
//       socket.onopen = () => {
//         dispatch(onOpenAllOrders());
//       };
//       socket.onmessage = (event) => {
//         dispatch(onMessageAllOrders(event.data));
//       };
//       socket.onclose = function () {
//         dispatch(onCloseAllOrders());
//       };
//     }

//     if (action.type === 'webSocket/onConnectUserOrders') {
//       const socket = new WebSocket(`${webSocketUrl}?token=${getCookie('accessToken')}`);
//       socket.onerror = () => {
//         dispatch(onErrorUserOrders());
//       };
//       socket.onopen = () => {
//         dispatch(onOpenUserOrders());
//       };
//       socket.onmessage = (event) => {
//         dispatch(onMessageUserOrders(event.data));
//       };
//       socket.onclose = function () {
//         dispatch(onCloseUserOrders());
//       };
//     }

//     next(action);
//   };
// };
