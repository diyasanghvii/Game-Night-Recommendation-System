// RatingPopUp.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RatingPopUp from "../../Components/RatingPopUp/RatingPopUp";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";

import rawgService from "../../Services/rawgService";
import { authRequest, UpdateUserRating } from "../../Services";
jest.mock("../../Services/rawgService", () => ({
  getGameDetails: jest.fn(),
  getAllGamesBySearch: jest.fn(),
}));
jest.mock("../../Services/", () => ({
  UpdateUserRating: jest
    .fn()
    .mockResolvedValueOnce({ data: { preferences: [] } }),
}));

describe("RatingPopUp", () => {
  const gameData = {
    id: 1,
    name: "Test Game",
    background_image: "https://example.com/image.jpg",
    description: "This is a test game description",
    genres: [{ id: 1, name: "Action" }],
    tags: [{ id: 1, name: "Tag1", language: "eng" }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading message on load", async () => {
    rawgService.getGameDetails.mockResolvedValueOnce({
      data: { game: gameData },
    });

    render(<RatingPopUp gameRawgId={1} isOwned />);

    const loadingMessage = await screen.findByText("Loading game details...");

    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders game data correctly", async () => {
    rawgService.getGameDetails.mockResolvedValueOnce({
      data: { game: gameData },
    });

    render(<RatingPopUp gameRawgId={1} isOwned />);

    const gameNameElement = await screen.findByText("Test Game");
    const descriptionElement = screen.getByText(
      "This is a test game description"
    );
    const genreElement = screen.getByText("Action");
    const tagElement = screen.getByText("Tag1");

    expect(gameNameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(genreElement).toBeInTheDocument();
    expect(tagElement).toBeInTheDocument();
  });

  test("updates user rating", async () => {
    rawgService.getGameDetails.mockResolvedValueOnce({
      data: { game: gameData },
    });

    render(<RatingPopUp gameRawgId={1} isOwned={true} />);

    const ratingInput = await screen.findByTestId("rating-component");

    const ratingValue = Number(ratingInput.querySelector("input").value);
    expect(ratingValue).toBe(1);
  });

  test("saves rating", async () => {
    rawgService.getGameDetails.mockResolvedValueOnce({
      data: { game: gameData },
    });

    render(
      <RatingPopUp
        gameRawgId={1}
        isOwned={true}
        gameRating={4}
        updateRatings={jest.fn()}
      />
    );

    const ratingInput = await screen.findByTestId("rating-component");
    userEvent.click(ratingInput);
    userEvent.keyboard("{arrowright}");

    const saveButton = screen.getByText("Save");
    userEvent.click(saveButton);

    expect(UpdateUserRating).toHaveBeenCalledTimes(1);
  });

  //Update test cases when user interest is added
});
