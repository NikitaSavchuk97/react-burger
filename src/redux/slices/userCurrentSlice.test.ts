import userCurrentSlice, { initialState } from './userCurrentSlice';

describe('Редуктор текущего пользователя выполняет:', () => {
  it('регистрация пользователя (запрос: отправка)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/postRegisterUser/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('регистрация пользователя (запрос: выполнен)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/postRegisterUser/fulfilled',
        payload: { success: true },
      },
    );
    expect(newState.userCurrentRegistrSuccessServerAnswer).toEqual(true);
    expect(newState.status).toEqual('success');
  });

  it('регистрация пользователя (запрос: ошибка)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/postRegisterUser/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });

  it('авторизация пользователя (запрос: отправка)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/postLoginUser/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('авторизация пользователя (запрос: выполнен)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/postLoginUser/fulfilled',
        payload: mockFetchedLoginData,
      },
    );
    expect(newState.userCurrent).toEqual(mockFetchedLoginData.user);
    expect(newState.userCurrentLoggedIn).toEqual(mockFetchedLoginData.success);
    expect(newState.status).toEqual('success');
  });

  it('авторизация пользователя (запрос: ошибка)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/postLoginUser/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });

  it('получение данных пользователя (запрос: отправка)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/getCurrentUser/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('получение данных пользователя (запрос: выполнен)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/getCurrentUser/fulfilled',
        payload: mockFetchedUserData,
      },
    );
    expect(newState.userCurrent).toEqual(mockFetchedUserData.user);
    expect(newState.userCurrentLoggedIn).toEqual(mockFetchedUserData.success);
    expect(newState.status).toEqual('success');
  });

  it('получение данных пользователя (запрос: ошибка)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/getCurrentUser/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });

  it('изменение данных пользователя (запрос: отправка)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/patchInfoUser/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('изменение данных пользователя (запрос: выполнен)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading', userCurrent: mockFetchedUserData.user },
      {
        type: 'userCurrent/patchInfoUser/fulfilled',
        payload: mockFetchedUserDataEdited,
      },
    );
    expect(newState.userCurrent).toEqual(mockFetchedUserDataEdited.user);
    expect(newState.status).toEqual('success');
  });

  it('изменение данных пользователя (запрос: ошибка)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/patchInfoUser/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });

  it('удаление данных пользователя (запрос: отправка)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/postLogoutUser/pending',
    });
    expect(newState.status).toEqual('');
  });

  it('удаление данных пользователя (запрос: выполнен)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/postLogoutUser/fulfilled',
    });
    expect(newState.userCurrent).toEqual(null);
    expect(newState.userCurrentLoggedIn).toEqual(false);
    expect(newState.status).toEqual('');
  });

  it('удаление данных пользователя (запрос: ошибка)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/postLogoutUser/rejected',
    });
    expect(newState.status).toEqual('');
  });

  it('отправка данных для смены пароля (запрос: отправка)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/postForgotPass/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('отправка данных для смены пароля (запрос: выполнен)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/postForgotPass/fulfilled',
        payload: mockFetchedUserForgotPass,
      },
    );
    expect(newState.userCurrentForgotPassServerAnswer).toEqual(mockFetchedUserForgotPass.success);
    expect(newState.status).toEqual('success');
  });

  it('отправка данных для смены пароля (запрос: ошибка)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/postForgotPass/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });

  it('получение данных о смене пароля (запрос: отправка)', () => {
    const newState = userCurrentSlice(initialState, {
      type: 'userCurrent/postResetPass/pending',
    });
    expect(newState.status).toEqual('loading');
  });

  it('получение данных о смене пароля (запрос: выполнен)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/postResetPass/fulfilled',
        payload: mockFetchedUserResetPass,
      },
    );
    expect(newState.userCurrentResetPassServerAnswer).toEqual(mockFetchedUserForgotPass.success);
    expect(newState.status).toEqual('success');
  });

  it('получение данных о смене пароля (запрос: ошибка)', () => {
    const newState = userCurrentSlice(
      { ...initialState, status: 'loading' },
      {
        type: 'userCurrent/postResetPass/rejected',
      },
    );
    expect(newState.status).toEqual('error');
  });
});

const mockFetchedLoginData = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTVkNTg1OTdlZGUwMDAxZDA1ZjhmMiIsImlhdCI6MTcxODc0MDAzMiwiZXhwIjoxNzE4NzQxMjMyfQ.7z8PSEVYVWWoQe3YNgJn8I8cchOxGurKmM8cJz3OjNE',
  refreshToken: 'a0132b1584f4e10bad3e27735fb79965d0003baa67cde61ef5bba15f7b46416f5829688fab9cc834',
  user: {
    email: 'nikita.savchuk@gmail.com',
    name: 'Nikita',
  },
};

const mockFetchedUserData = {
  success: true,
  user: {
    email: 'nikita.savchuk@gmail.com',
    name: 'Nikita',
  },
};

const mockFetchedUserDataEdited = {
  success: true,
  user: {
    email: 'nikita.savchuk@gmail.com',
    name: 'Nikita123',
  },
};

const mockFetchedUserForgotPass = {
  success: true,
  message: 'Reset email sent',
};

const mockFetchedUserResetPass = {
  success: true,
  message: 'Password successfully reset',
};
