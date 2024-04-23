const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Update User Rating API testing", () => {
  let authToken;

  beforeAll(async () => {
    const user = {
      name: "Test User",
      email: "test1221@example.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/api/user/signupone")
      .send(user)
      .expect(200);

    let res = JSON.parse(response.text);
    authToken = res.token;
  });

  afterAll(async () => {
    await User.deleteOne({ email: "test@example.com" });
    await mongoose.connection.close();
  });

  it("should update user rating and return 200 status", async () => {
    const preference = {
      gameSteamId: 123456,
      gameRawgId: 789012,
      gameName: "Test Game",
      ratings: 4,
    };

    const response = await request(app)
      .post("/api/user/updaterating")
      .send({ preference })
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.message).toBe("User Preferences Updated!");
    expect(response.body.preferences[0].gameName).toEqual("Test Game");
  }, 7000);
});
