import ingredientDetailsSlice, { initialState } from './ingredientsSlice';

describe('Редуктор ингредиентов выполняет:', () => {
  it('добавление ингредиентов (запрос: отправка)', () => {
    const newState = ingredientDetailsSlice(initialState, {
      type: 'ingredients/getIngredients/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('добавление ингредиентов (запрос: выполнен)', () => {
    const newState = ingredientDetailsSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'ingredients/getIngredients/fulfilled',
        payload: mockFetchedDataFull,
      },
    );
    expect(newState.ingredients).toEqual(mockFetchedDataIngredients);
    expect(newState.status).toEqual('success');
  });

  it('добавление ингредиентов (запрос: ошибка)', () => {
    const newState = ingredientDetailsSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'ingredients/getIngredients/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });
});

const mockFetchedDataIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
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
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
  },
];

const mockFetchedDataFull = {
  success: true,
  data: mockFetchedDataIngredients,
};
