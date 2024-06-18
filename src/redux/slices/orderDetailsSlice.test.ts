import orderDetailsSlice, {
  addOrderDetails,
  removeOrderDetails,
  initialState,
} from './orderDetailsSlice';

describe('Редуктор деталей заказа выполняет:', () => {
  it('добавление информации о заказе', () => {
    const newState = orderDetailsSlice(initialState, addOrderDetails(mockFetchedDataOrder));
    expect(newState.orderDetails).toEqual(mockFetchedDataOrder);
  });

  it('добавление информации о заказе отсутствующего в ленте (запрос: отправка)', () => {
    const newState = orderDetailsSlice(initialState, {
      type: 'orderDetails/getCurrentOrder/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('добавление информации о заказе отсутствующего в ленте (запрос: выполнен)', () => {
    const newState = orderDetailsSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'orderDetails/getCurrentOrder/fulfilled',
        payload: mockFetchedDataFull,
      },
    );
    expect(newState.orderDetails).toEqual(mockFetchedDataOrder);
    expect(newState.status).toEqual('success');
  });

  it('добавление информации о заказе отсутствующего в ленте (запрос: ошибка)', () => {
    const newState = orderDetailsSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'orderDetails/getCurrentOrder/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });

  it('удаление информации о заказе', () => {
    const newState = orderDetailsSlice(
      { ...initialState, orderDetails: mockFetchedDataOrder },
      removeOrderDetails(),
    );
    expect(newState.orderDetails).toBeNull();
  });
});

const mockFetchedDataOrder = {
  _id: '66597de397ede0001d06dc2c',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa0942',
  ],
  status: 'done',
  name: 'Space флюоресцентный spicy бургер',
  createdAt: '2024-05-31T07:36:03.514Z',
  updatedAt: '2024-05-31T07:36:03.905Z',
  number: 41264,
};

const mockFetchedDataFull = {
  success: true,
  orders: [mockFetchedDataOrder],
};
