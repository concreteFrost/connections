import "@testing-library/jest-dom";

describe("mocked test", () => {
  it("mocking", () => {});
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock as any;
