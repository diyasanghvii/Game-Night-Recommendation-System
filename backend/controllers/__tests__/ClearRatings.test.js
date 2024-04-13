const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Clear Ratings API testing", () => {
  const paramBody = {
    name: "Delete",
    email: "clearRatings@test.com",
    password: "123123",
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

  it("should return 200 status and success message after clearing game ratings", async () => {
    const preference = {
      gameSteamId: 123456,
      gameRawgId: 789012,
      gameName: "Test Game",
      ratings: 4,
    };

    const data = {
      gameSteamId: 123456,
    };

    await request(app)
      .post("/api/user/updaterating")
      .send({ preference })
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    const response = await request(app)
      .post("/api/user/clearrating")
      .set("Authorization", `Bearer ${authToken}`)
      .send(data)
      .expect(200);

    expect(response.body.message).toBe("Ratings cleared Successfully!");
  });

  it("should return 200 status and ratings should be set to null", async () => {
    const preference = {
      gameSteamId: 123456,
      gameRawgId: 789012,
      gameName: "Test Game",
      ratings: 4,
    };

    const data = {
      gameSteamId: 123456,
    };

    await request(app)
      .post("/api/user/updaterating")
      .send({ preference })
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    const response = await request(app)
      .post("/api/user/clearrating")
      .set("Authorization", `Bearer ${authToken}`)
      .send(data)
      .expect(200);

    expect(response.body.preferences.length).toBe(0);
  });

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .post("/api/user/clearrating")
      .send()
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  });
});
