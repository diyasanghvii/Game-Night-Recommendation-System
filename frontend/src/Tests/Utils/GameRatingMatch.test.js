import { gameRatingMatch } from "../../Utils";

describe("gameRatingMatch utils function testing", () => {
  const ratings = [
    {
      gameSteamId: 2357570,
      gameName: "Overwatch 2",
      interest: 1,
    },
    {
      gameRawgId: 3498,
      gameName: "Grand Theft Auto V",
      interest: 1,
    },
    {
      gameRawgId: 3328,
      gameName: "The Witcher 3: Wild Hunt",
      interest: 0,
    },
    {
      gameRawgId: 4200,
      gameName: "Portal 2",
      interest: 1,
    },
    {
      gameRawgId: 4291,
      gameName: "Counter-Strike: Global Offensive",
      interest: 1,
    },
  ];

  it("It should return rating for game correctly", () => {
    const gameRatings = gameRatingMatch(ratings, "Overwatch 2", 2357570, null);
    expect(gameRatings).toEqual(1);
  });

  it("it should return the correct interest rating", () => {
    const gameRatings = gameRatingMatch(
      ratings,
      "The Witcher 3: Wild Hunt",
      null,
      3328
    );
    expect(gameRatings).toBe(null);
  });

  it("it should return null if it doesnt find the game", () => {
    const result = gameRatingMatch(ratings, "wrong Game name", null, null);
    expect(result).toBeNull();
  });
});
