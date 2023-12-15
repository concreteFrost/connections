module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.scss$': 'jest-transform-stub', // Add this line for SCSS support
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.scss$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./src/setupTests.js'],
};
