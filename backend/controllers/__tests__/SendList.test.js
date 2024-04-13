const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Get User Steam Game List API testing", () => {
  const paramBody = {
    name: "SER user test case admins",
    email: "steamInfo1231@test.com",
    password: "123123",
  };

  const paramBody2 = {
    email: "steamInfo1231@test.com",
    steamId: "76561198807764656",
  };

  const bodyParam = {
    selectedChannel: "Gaming",
    selectedServer: "diya_san's test server",
    selectedMembers: [
      {
        username: "k__adam",
        name: "Adam",
      },
      {
        username: "lazyotaku.",
        name: "Manisha M",
      },
    ],
    recommendations: [],
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
  }, 70000);

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("should return 200 status and success message after sending recommendation list.", async () => {
    const response = await request(app)
      .post("/api/discord/sendlist")
      .set("Authorization", `Bearer ${authToken}`)
      .send(bodyParam)
      .expect(200);

    expect(response.body.message).toBe("Successfully sent recommendations.");
  }, 70000);

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .post("/api/discord/sendlist")
      .send(bodyParam)
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  }, 70000);
});
