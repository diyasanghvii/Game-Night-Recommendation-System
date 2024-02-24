const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Get Genre API testing", () => {
  const paramBody = {
    name: "SER user test case admins",
    email: "genretest@test.com",
    password: "123123",
  };

  let authToken;

  beforeAll(async () => {
    const response = await request(app)
      .post("/user/signupone")
      .send(paramBody)
      .expect(200);

    let res = JSON.parse(response.text);
    authToken = res.token;
  });

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("should return 200 status and success message after fetching game genre message", async () => {
    const response = await request(app)
      .get("/game/getgenre")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.message).toBe("Fetched genre list!");
  });

  it("should return 200 status and genreList should be array", async () => {
    const response = await request(app)
      .get("/game/getgenre")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.genreList).toBeInstanceOf(Array);
  });

  it("should return 200 status and success message after fetching game genre data", async () => {
    const response = await request(app)
      .get("/game/getgenre")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.genreList).toContain("Action");
  });

    it("should return 401 status if user is not authorised, Not passing auth token", async () => {
      const response = await request(app)
        .get("/game/getgenre")
        .send()
        .expect(401);

      expect(response.body.message).toBe("Not Authorised, No token!");
    });
});
