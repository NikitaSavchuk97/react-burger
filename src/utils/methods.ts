import { ItemPropTypes } from './types';

export const formatOrderDate = (orderDate: string) => {
  const today = new Date();
  const orderDateObj = new Date(orderDate);

  const formatter = ({ day, month, year }: { day: number; month: number; year: number }) => {
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isYesterday = (date1: Date, date2: Date) => {
    const yesterday = new Date(date1);
    yesterday.setDate(date1.getDate() - 1);
    return isSameDay(yesterday, date2);
  };

  if (isSameDay(today, orderDateObj)) {
    const hours = orderDateObj.getHours().toString().padStart(2, '0');
    const minutes = orderDateObj.getMinutes().toString().padStart(2, '0');
    return `сегодня в ${hours}:${minutes}`;
  } else if (isYesterday(today, orderDateObj)) {
    const hours = orderDateObj.getHours().toString().padStart(2, '0');
    const minutes = orderDateObj.getMinutes().toString().padStart(2, '0');
    return `вчера в ${hours}:${minutes}`;
  } else {
    const year = orderDateObj.getFullYear();
    const month = orderDateObj.getMonth();
    const day = orderDateObj.getDate();
    return formatter({ day, month, year });
  }
};

export const reducePrice = (orderIngredientsListIds: string[], ingredients: ItemPropTypes[]) => {
  const ingredientsPriceArr: (number | undefined)[] = orderIngredientsListIds.map((id) => {
    const takeIt = ingredients?.find((ing: ItemPropTypes) => ing._id === id);
    return takeIt?.price;
  });
  const totalOrderPrice = ingredientsPriceArr.reduce(function (
    currentSum: number,
    currentNumber: number | undefined,
  ) {
    if (typeof currentNumber === 'number') {
      return currentSum + currentNumber;
    } else {
      return currentSum; // Или можно вернуть другое значение по умолчанию
    }
  },
  0);
  return totalOrderPrice;
};
