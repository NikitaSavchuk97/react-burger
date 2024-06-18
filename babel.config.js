module.exports = {
  presets: [
    '@babel/preset-env', // Транспиляция современного JavaScript в ES5
    '@babel/preset-react', // Поддержка JSX
    '@babel/preset-typescript', // Поддержка TypeScript
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Оптимизация кода и поддержка async/await
  ],
};
