const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Get user information API testing", () => {
  const paramBody = {
    name: "SER user test case admins",
    email: "serusertestcases@test.com",
    password: "123123",
  };

  const updateData = {
    email: "serusertestcases@test.com",
    steamId: "steamId",
    discordUserName: "discordUserName",
    discordServerName: "server name",
    discordChannelName: "channel name",
  };

  let authToken;

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/user/signupone")
      .send(paramBody)
      .expect(200);

    let res = JSON.parse(response.text);
    authToken = res.token;

    await request(app)
      .post("/api/user/signuptwo")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);
  });

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("should return 200 status and success message after fetching user details", async () => {
    const response = await request(app)
      .get("/api/user/getuserdetails")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.message).toBe("User Details Fetched Sucessfully!");
  });

  it("should return 200 status and success message and details should be correct", async () => {
    const response = await request(app)
      .get("/api/user/getuserdetails")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.email).toBe("serusertestcases@test.com");
    expect(response.body.name).toBe("SER user test case admins");
  });

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .get("/api/user/getuserdetails")
      .send()
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  });

  it("should return 401 status if user is not authorised, passing wrong auth token", async () => {
    const response = await request(app)
      .get("/api/user/getuserdetails")
      .set("Authorization", `Bearer 123`)
      .send()
      .expect(401);

    expect(response.body.message).toBe("Not Authorised!");
  });
});
