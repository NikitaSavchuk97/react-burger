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