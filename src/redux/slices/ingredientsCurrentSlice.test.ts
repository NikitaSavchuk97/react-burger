import ingredientsCurrentSlice, {
  addBunCurrent,
  addToOrderList,
  clearOrderList,
  addIngredientsCurrent,
  removeIngredientsCurrent,
  setTotalPrice,
  initialState,
} from './ingredientsCurrentSlice';

describe('Редуктор ингредиентов текущего заказа выполняет:', () => {
  it('добавление ингредиента "Булка" в заказ', () => {
    const newState = ingredientsCurrentSlice(initialState, addBunCurrent(mockFetchedDataBun));
    expect(newState.bunCurrent).toEqual(mockFetchedDataBun);
  });

  it('добавление ингредиента "Начинка" или "Соус" в заказ', () => {
    const newState = ingredientsCurrentSlice(
      initialState,
      addIngredientsCurrent(mockFetchedDataIngredient),
    );
    expect(newState.ingredientsCurrent).toEqual([mockFetchedDataIngredient]);
  });

  it('добавление массива ингредиентов в заказ', () => {
    const newState = ingredientsCurrentSlice(
      initialState,
      addToOrderList(mockFetchedDataOrderIngredients),
    );
    expect(newState.orderCurrentList).toEqual(mockFetchedDataOrderIngredients);
  });

  it('добавление цены на заказ', () => {
    const newState = ingredientsCurrentSlice(initialState, setTotalPrice(4321));
    expect(newState.totalPrice).toEqual(4321);
  });

  it('отправка заказа (запрос: отправка)', () => {
    const newState = ingredientsCurrentSlice(initialState, {
      type: 'ingredientsCurrent/postOrderUser/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('отправка заказа (запрос: выполнен)', () => {
    const newState = ingredientsCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'ingredientsCurrent/postOrderUser/fulfilled',
        payload: mockFetchedDataOrderInfo,
      },
    );
    expect(newState.orderCurrentInProgress).toEqual(mockFetchedDataOrderInfo);
    expect(newState.status).toEqual('success');
  });

  it('отправка заказа (запрос: ошибка)', () => {
    const newState = ingredientsCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'ingredientsCurrent/postOrderUser/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });

  it('удаление ингредиента из заказа', () => {
    const newState = ingredientsCurrentSlice(
      { ...initialState, ingredientsCurrent: mockFetchedDataOrderIngredients },
      removeIngredientsCurrent('c20d859c-402b-4643-86b7-a2c21d93f48c'),
    );
    expect(newState.ingredientsCurrent).toEqual(
      mockFetchedDataOrderIngredients.filter(
        (item) => item.removeId !== 'c20d859c-402b-4643-86b7-a2c21d93f48c',
      ),
    );
  });

  it('удаление данных стейта', () => {
    const newState = ingredientsCurrentSlice(
      { ...initialState, orderCurrentList: mockFetchedDataOrderIngredients },
      clearOrderList(),
    );
    expect(newState.orderCurrentList).toEqual(initialState.orderCurrentList);
  });
});

const mockFetchedDataBun = {
  _id: '643d69a5c3f7b9001cfa093d',
  removeId: 'some-remove-id',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0,
};

const mockFetchedDataIngredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0,
  removeId: '56cde6a6-c369-47db-a357-8925bc5589c4',
};

const mockFetchedDataOrderIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    removeId: 'some-remove-id',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    removeId: 'some-remove-id',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    __v: 0,
    removeId: 'd71b9984-b0e5-4583-9d5c-62cc5f3b7fbf',
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    removeId: 'c20d859c-402b-4643-86b7-a2c21d93f48c',
  },
  {
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
    __v: 0,
    removeId: 'eb7fb5c4-4bc5-49f8-bb65-edf6d7d40c97',
  },
];

const mockFetchedDataOrderInfo = {
  success: true,
  name: 'Space флюоресцентный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
      },
    ],
    _id: '66709c91856777001bb1bb22',
    owner: {
      name: 'Nikita',
      email: 'nikita.savchuk@gmail.com',
      createdAt: '2024-03-04T14:07:01.355Z',
      updatedAt: '2024-06-06T07:00:12.364Z',
    },
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2024-06-17T20:29:05.042Z',
    updatedAt: '2024-06-17T20:29:05.454Z',
    number: 43136,
    price: 2056,
  },
};
