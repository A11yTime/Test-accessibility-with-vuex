// jest.config.js
export default {
    preset: '@vue/cli-plugin-unit-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'vue'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    extensionsToTreatAsEsm: ['.ts', '.js', '.jsx', '.mjs', '.vue'], // Add this line
    globals: {
      'vue-jest': {
        tsConfig: 'tsconfig.json', // Optional: if you're using TypeScript
      },
    },
  };
  