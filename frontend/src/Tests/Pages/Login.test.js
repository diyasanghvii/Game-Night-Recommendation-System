import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../../Pages/Login";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("renders login page", () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByText(/Submit/i);
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("allows user to type in username and password fields", () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  expect(usernameInput.value).toBe("testuser");
  expect(passwordInput.value).toBe("testpassword");
});

test("submits login form with valid credentials", () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByText(/Submit/i);
  fireEvent.change(usernameInput, { target: { value: "validusername" } });
  fireEvent.change(passwordInput, { target: { value: "validpassword" } });
  fireEvent.click(submitButton);
});
