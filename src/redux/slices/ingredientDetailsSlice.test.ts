import ingredientDetailsSlice, {
  initialState,
  addIngredientDetails,
  removeIngredientDetails,
} from './ingredientDetailsSlice';

describe('Редуктор информации о ингредиенте выполняет:', () => {
  it('добавление ингредиента "Булка" в модальное окно', () => {
    const newState = ingredientDetailsSlice(initialState, addIngredientDetails(mockFetchedData));
    expect(newState.ingredientDetails).toEqual(mockFetchedData);
  });

  it('удаление ингредиента "Булка" из модального окна', () => {
    const newState = ingredientDetailsSlice(initialState, removeIngredientDetails());
    expect(newState).toEqual(initialState);
  });
});

const mockFetchedData = {
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
