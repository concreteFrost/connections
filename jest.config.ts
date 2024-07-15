export default {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Указываем использовать jsdom для виртуальной DOM
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(css|scss)$": "jest-transform-stub",
  },
  moduleNameMapper: {
    '^store/(.*)$': '<rootDir>/src/store/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ["node_modules/(?!troublesome-dependency/.*)"],
};
