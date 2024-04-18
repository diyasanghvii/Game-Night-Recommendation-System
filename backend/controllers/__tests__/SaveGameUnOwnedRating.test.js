const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Save UnOwned Game Rating API testing", () => {
  const paramBody = {
    name: "SaveGameUnOwnedRating",
    email: "SaveGameUnOwnedRating@test.com",
    password: "123123",
  };

  const paramBodyGenre = {
    gameSteamId: 123,
    gameName: "Pubg",
    interest: 1.75,
  };

  let authToken;

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/user/signupone")
      .send(paramBody)
      .expect(200);

    let res = JSON.parse(response.text);
    authToken = res.token;
  });

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("should return 200 status and success message after updating game ratings for  unowned game", async () => {
    const response = await request(app)
      .post("/api/user/updateunownedgamerating")
      .set("Authorization", `Bearer ${authToken}`)
      .send(paramBodyGenre)
      .expect(200);

    expect(response.body.message).toBe("User Preferences Updated!");
  });

  it("Game ratings should be successfuly updated and reflected in the response", async () => {
    const response = await request(app)
      .post("/api/user/updateunownedgamerating")
      .set("Authorization", `Bearer ${authToken}`)
      .send(paramBodyGenre)
      .expect(200);

    expect(response.body.preferences[0].interest).toBe(1.75);
  });

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .post("/api/user/updateunownedgamerating")
      .send(paramBodyGenre)
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  });
});
