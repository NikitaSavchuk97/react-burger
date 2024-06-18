import { defineConfig } from 'cypress';
import urlConstants from './src/utils/urls';

export default defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {},
    specPattern: 'src/**/*.spec.{js,ts,jsx,tsx}',
  },

  e2e: {
    baseUrl: urlConstants.localFrontendTestUrl,
    env: {
      bun: '[id="643d69a5c3f7b9001cfa093d"]',
      closeModalBtn: '[id="close-modal-button"]',
      miniSalad: '[id="643d69a5c3f7b9001cfa0949"]',
      dropTargetIngredient: '[id="constructor-drop-target-ingredient"]',
      email: 'nikita.savchuk@gmail.com',
      password: '12345678',
    },
  },
});
