import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup3 from "../../Components/Signup3/Signup3";
import "@testing-library/jest-dom";

describe("Signup3 Component", () => {
  it("renders without errors", () => {
    render(<Signup3 />);
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

  it("displays error message when trying to sign up without selecting genres and rating games", async () => {
    render(<Signup3 />);
    const completeButton = screen.getByText("Complete Registration");
    fireEvent.click(completeButton);
    await waitFor(() => {
      expect(screen.getByText("Please select at least 5 genres and rate at least 5 games.")).toBeInTheDocument();
    });
  });

});
