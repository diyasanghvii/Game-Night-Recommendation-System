import axios from "axios";

const mockAuthRequest = {
  get: jest.fn(),
  post: jest.fn(),
  interceptors: axios.create().interceptors,
};

export const authRequest = mockAuthRequest;

export const UpdateUserRating = jest.fn();
