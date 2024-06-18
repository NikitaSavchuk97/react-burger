import webSocketSlice, {
  onMessageAllOrders,
  onCloseAllOrders,
  onMessageUserOrders,
  onCloseUserOrders,
  initialState,
} from './webSocketSlice';

describe('Редуктор подключения веб-сокетов выполняет:', () => {
  it('подключение к общей ленте заказов', () => {
    const newState = webSocketSlice(initialState, onMessageAllOrders(mockFetchedAllOrders));
    expect(newState.socketAllOrders).toEqual(JSON.parse(mockFetchedAllOrders).orders);
    expect(newState.socketTotalOrders).toEqual(JSON.parse(mockFetchedAllOrders).total);
    expect(newState.socketTotalTodayOrders).toEqual(JSON.parse(mockFetchedAllOrders).totalToday);
  });

  it('отключение от общей ленты заказов', () => {
    const newState = webSocketSlice(initialState, onCloseAllOrders());
    expect(newState.socketAllOrders).toEqual(null);
    expect(newState.socketTotalOrders).toEqual(null);
    expect(newState.socketTotalTodayOrders).toEqual(null);
  });

  it('подключение к пользовательской ленте заказов', () => {
    console.log(initialState);
    const newState = webSocketSlice(initialState, onMessageUserOrders(mockFetchedUserOrders));
    expect(newState.socketUserOrders).toEqual(JSON.parse(mockFetchedUserOrders).orders.reverse());
  });

  it('отключение от пользовательской ленты заказов', () => {
    const newState = webSocketSlice(initialState, onCloseUserOrders());
    expect(newState.socketUserOrders).toEqual(null);
  });
});

const mockFetchedAllOrders =
  '{"success":true,"orders":[{"_id":"6671efcd856777001bb1bf10","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093f","643d69a5c3f7b9001cfa0940","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный бессмертный метеоритный бургер","createdAt":"2024-06-18T20:36:29.481Z","updatedAt":"2024-06-18T20:36:29.905Z","number":43317},{"_id":"6671efac856777001bb1bf0f","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa0940","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный метеоритный бургер","createdAt":"2024-06-18T20:35:56.412Z","updatedAt":"2024-06-18T20:35:56.904Z","number":43316},{"_id":"6671ea7a856777001bb1bef3","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093f","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бессмертный бургер","createdAt":"2024-06-18T20:13:46.924Z","updatedAt":"2024-06-18T20:13:47.399Z","number":43315}],"total":42943,"totalToday":170}';

const mockFetchedUserOrders =
  '{"success":true,"orders":[{"_id":"65e5d58d97ede0001d05f8f4","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-03-04T14:07:09.442Z","updatedAt":"2024-03-04T14:07:09.809Z","number":35749},{"_id":"65e5d5e297ede0001d05f8f6","ingredients":["643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный бургер","createdAt":"2024-03-04T14:08:34.318Z","updatedAt":"2024-03-04T14:08:34.785Z","number":35750},{"_id":"65e6ab7397ede0001d05fa94","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa0945"],"status":"done","name":"Space флюоресцентный антарианский бургер","createdAt":"2024-03-05T05:19:47.732Z","updatedAt":"2024-03-05T05:19:48.342Z","number":35814}],"total":42944,"totalToday":170}';
