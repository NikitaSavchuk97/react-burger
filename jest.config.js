module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // 'node' если тестируете только редусеры без использования DOM
  transform: {
    '^.+\\.tsx?$': 'babel-jest', // Использование babel-jest для трансформации файлов
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
