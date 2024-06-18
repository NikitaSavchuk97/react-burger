describe('E2E тесты функциональности сборки и оформления заказа:', () => {
  beforeEach(() => {
    // Переход на главную страницу и установка размеров окна браузера
    cy.visit('/');
    cy.viewport(1280, 720);
  });

  it('открытие и закрытие модального окна информации о ингредиенте', () => {
    // Открытие модального окна информации о ингредиенте
    cy.get('[id="643d69a5c3f7b9001cfa093d"]').click();

    // Проверка видимости кнопки закрытия модального окна
    cy.get('[id="close-modal-button"]').should('be.visible');

    // Закрытие модального окна
    cy.get('[id="close-modal-button"]').click();

    // Проверка отсутствия кнопки закрытия модального окна после его закрытия
    cy.get('[id="close-modal-button"]').should('not.exist');
  });

  it('перенос ингредиентов в конструктор и удаление', () => {
    // Перемещение булочки в конструктор
    cy.get('[id="643d69a5c3f7b9001cfa093d"]').drag('[id="constructor-drop-target-bun"]');
    cy.get('[id="643d69a5c3f7b9001cfa093d"]').should('be.visible');

    // Перемещение ингредиента в конструктор
    cy.get('[id="643d69a5c3f7b9001cfa0949"]').drag('[id="constructor-drop-target-ingredient"]');
    cy.get('[id="643d69a5c3f7b9001cfa0949"]').should('be.visible');

    // Удаление ингредиента из конструктора
    cy.get('[id="inner643d69a5c3f7b9001cfa0949"]')
      .find('*[class^="constructor-element__action"]')
      .click();
    cy.get('[id="inner643d69a5c3f7b9001cfa0949"]').should('not.exist');
  });

  it('оформление заказа пользователем', () => {
    // Перемещение булочки в конструктор и проверка её видимости
    cy.get('[id="643d69a5c3f7b9001cfa093d"]').drag('[id="constructor-drop-target-bun"]');
    cy.get('[id="643d69a5c3f7b9001cfa093d"]').should('be.visible');

    // Перемещение ингредиента в конструктор и проверка его видимости
    cy.get('[id="643d69a5c3f7b9001cfa0945"]').drag('[id="constructor-drop-target-ingredient"]');
    cy.get('[id="643d69a5c3f7b9001cfa0945"]').should('be.visible');

    // Перемещение второго ингредиента в конструктор и проверка его видимости
    cy.get('[id="643d69a5c3f7b9001cfa0941"]').drag('[id="constructor-drop-target-ingredient"]');
    cy.get('[id="643d69a5c3f7b9001cfa0941"]').should('be.visible');

    // Перемещение третьего ингредиента в конструктор и проверка его видимости
    cy.get('[id="643d69a5c3f7b9001cfa0949"]').drag('[id="constructor-drop-target-ingredient"]');
    cy.get('[id="643d69a5c3f7b9001cfa0949"]').should('be.visible');

    // Перехват запроса на логин
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login').as('login');

    // Нажатие на кнопку "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click();

    // Ввод данных для логина
    cy.get('input[name="email"]').type(Cypress.env('email'));
    cy.get('input[name="password"]').type(Cypress.env('password'));

    // Отправка формы логина
    cy.get('button[type="submit"]').click();

    // Ожидание завершения запроса на логин и проверка статуса ответа
    cy.wait('@login').its('response.statusCode').should('eq', 200);

    // Перехват запроса на оформление заказа
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('getOrder');

    // Повторное нажатие на кнопку "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click();

    // Ожидание завершения запроса на оформление заказа и проверка статуса ответа
    cy.wait('@getOrder', { timeout: 30000 }).its('response.statusCode').should('eq', 200);

    // Проверка видимости номера заказа
    cy.get('[id="placed-order-number"]').should('be.visible');

    // Закрытие модального окна
    cy.get('[id="close-modal-button"]').click();
  });
});
