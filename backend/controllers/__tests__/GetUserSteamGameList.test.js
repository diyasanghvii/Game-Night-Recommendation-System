const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Get User Steam Game List API testing", () => {
  const paramBody = {
    name: "SER user test case admins",
    email: "steamInfo@test.com",
    password: "123123",
  };

  const paramBody2 = {
    email: "steamInfo@test.com",
    steamId: "76561198807764656",
  };

  let authToken;

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/user/signupone")
      .send(paramBody)
      .expect(200);

    let res = JSON.parse(response.text);
    authToken = res.token;

    const response2 = await request(app)
      .post("/api/user/signupTwo")
      .set("Authorization", `Bearer ${authToken}`)
      .send(paramBody2)
      .expect(200);
  });

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  }, 7000);

  it("should return 200 status and succes message afteer fetching steam info", async () => {
    const response = await request(app)
      .get("/api/steam/getusersteamgamelist")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.message).toBe("Fetched user steam game list!");
  }, 7000);

  it("should return 200 status and steamGames should be array", async () => {
    const response = await request(app)
      .get("/api/steam/getusersteamgamelist")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.steamGames).toBeInstanceOf(Array);
  }, 7000);

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .get("/api/steam/getusersteamgamelist")
      .send()
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  }, 7000);
});
