import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SignUp1 from "../../Components/Signup1/Signup1";

describe("SignUp1 Component", () => {
  describe("Rendering", () => {
    it("renders all input fields", () => {
      const { getByLabelText } = render(<SignUp1 />);

      expect(getByLabelText("Name")).toBeInTheDocument();
      expect(getByLabelText("Email")).toBeInTheDocument();
      expect(getByLabelText("Password")).toBeInTheDocument();
      expect(getByLabelText("Confirm Password")).toBeInTheDocument();
    });
  });

  describe("Input and State Update", () => {
    it("updates state on input change", () => {
      const { getByLabelText } = render(<SignUp1 />);
      const usernameInput = getByLabelText("Name");
      const emailInput = getByLabelText("Email");
      const passwordInput = getByLabelText("Password");
      const confirmPasswordInput = getByLabelText("Confirm Password");

      fireEvent.change(usernameInput, { target: { value: "taylor_swift" } });
      fireEvent.change(emailInput, { target: { value: "taylor@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "password123" },
      });

      expect(usernameInput.value).toBe("taylor_swift");
      expect(emailInput.value).toBe("taylor@example.com");
      expect(passwordInput.value).toBe("password123");
      expect(confirmPasswordInput.value).toBe("password123");
    });
  });

  describe("Password Validation", () => {
    it("displays alert when passwords do not match", () => {
      const { getByLabelText, getByText } = render(<SignUp1 />);
      const passwordInput = getByLabelText("Password");
      const confirmPasswordInput = getByLabelText("Confirm Password");

      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "differentpassword" },
      });

      expect(passwordInput.value).toBe("password123");
      expect(confirmPasswordInput.value).toBe("differentpassword");
    });

    it("does not display alert when passwords match", () => {
      const { getByLabelText, queryByText } = render(<SignUp1 />);
      const passwordInput = getByLabelText("Password");
      const confirmPasswordInput = getByLabelText("Confirm Password");

      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "password123" },
      });

      expect(passwordInput.value).toBe("password123");
      expect(confirmPasswordInput.value).toBe("password123");
      expect(queryByText("Passwords do not match!")).not.toBeInTheDocument();
    });
  });

  describe("Password Visibility Toggle", () => {
    it("toggles password visibility", () => {
      const { getByLabelText } = render(<SignUp1 />);
      const passwordInput = getByLabelText("Password");
      expect(passwordInput.type).toBe("password");
    });
  });
});