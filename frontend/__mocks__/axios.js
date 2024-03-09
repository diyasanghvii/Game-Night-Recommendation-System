const axios = jest.genMockFromModule("axios");

axios.create = jest.fn(() => ({
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
}));

export default axios;
