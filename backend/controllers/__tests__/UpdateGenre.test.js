const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Get Genre API testing", () => {
  const paramBody = {
    name: "SER user test case admins",
    email: "updategenretest@test.com",
    password: "123123",
  };

  const paramBodyGenre = {
    email: "updategenretest@test.com",
    preferredGenres: ["Action", "Sports", "Adventure", "Cards", "Racing"],
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

  it("should return 200 status and success message after updating game genre message", async () => {
    const response = await request(app)
      .post("/api/user/updategenre")
      .send(paramBodyGenre)
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.message).toBe("User Genre Updated!");
  });

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .post("/api/user/updategenre")
      .send(paramBodyGenre)
      .send()
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  });
});
