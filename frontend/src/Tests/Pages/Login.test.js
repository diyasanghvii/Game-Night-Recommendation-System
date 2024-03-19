import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../Pages/Login";
import { MemoryRouter } from "react-router-dom";

describe("Login Component", () => {
  describe("Rendering", () => {
    it("renders all input fields", () => {
      const { getByLabelText } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      expect(getByLabelText("Email ID")).toBeInTheDocument();
      expect(getByLabelText("Password")).toBeInTheDocument();
    });

    it("renders sign up button", () => {
      const { getByText } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
      expect(getByText("Sign Up")).toBeInTheDocument();
    });
  });

  describe("Input and State Update", () => {
    it("updates state on input change", () => {
      const { getByLabelText } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
      const emailInput = getByLabelText("Email ID");
      const passwordInput = getByLabelText("Password");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(emailInput.value).toBe("test@example.com");
      expect(passwordInput.value).toBe("password123");
    });
  });

  describe("Password Visibility", () => {
    it("toggles password visibility when eye icon is clicked", async () => {
      const { getByLabelText } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
      const passwordInput = getByLabelText("Password");
      const eyeIcon = getByLabelText("Toggle password visibility");
      expect(passwordInput.type).toBe("password");
      fireEvent.click(eyeIcon);
      await waitFor(() => expect(passwordInput.type).toBe("text"));
      fireEvent.click(eyeIcon);
      await waitFor(() => expect(passwordInput.type).toBe("password"));
    });
  });
  

  describe("Form Submission", () => {
    it("submits form with correct data", () => {
      const loginApiMock = jest.fn().mockResolvedValueOnce({ data: { token: "token123" } });
      const { getByText, getByLabelText } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
      const emailInput = getByLabelText("Email ID");
      const passwordInput = getByLabelText("Password");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      fireEvent.click(getByText("Submit"));
    });

    it("displays error message if form submission fails", async () => {
      const loginApiMock = jest.fn().mockRejectedValueOnce({ response: { data: { message: "Invalid credentials" } } });
      const { getByText, findByText, getByLabelText } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
      const emailInput = getByLabelText("Email ID");
      const passwordInput = getByLabelText("Password");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      fireEvent.click(getByText("Submit"));
    });
  });

  describe("Navigation", () => {
    it("navigates to sign up page when sign up button is clicked", () => {
      const { getByText, history } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
      fireEvent.click(getByText("Sign Up"));
    });
  });
});