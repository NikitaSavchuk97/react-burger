import { defineConfig } from 'cypress';

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
    baseUrl: 'http://localhost:3000',
    env: {
      email: 'nikita.savchuk@gmail.com',
      password: '12345678',
    },
  },
});
