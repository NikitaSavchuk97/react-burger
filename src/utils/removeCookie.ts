import { setCookie } from './setCookie';

export function removeCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  });
}
