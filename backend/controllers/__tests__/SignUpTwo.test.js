const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Sign up step two update API testing", () => {
  const paramBody = {
    name: "SER test case admins",
    email: "signUptwoTest@test.com",
    password: "123123",
  };

  const updateData = {
    email: "signUptwoTest@test.com",
    steamId: "steamId",
    discordUserName: "discordUserName",
    discordServerName: "server name",
    discordChannelName: "channel name",
  };

  const updateDataInvalid = {
    email: "sertestcases1@test.com",
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
  }, 70000);

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("should return 200 status and success message after user step two updation", async () => {
    const response = await request(app)
      .post("/api/user/signuptwo")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);

    expect(response.body.message).toBe("Updated User Information Successfully");
  }, 70000);

  it("should return 400 status if user is not present in the DB", async () => {
    const response = await request(app)
      .post("/api/user/signuptwo")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateDataInvalid)
      .expect(400);

    expect(response.body.message).toBe("User Does Not Exists!");
  }, 70000);

  it("data should be updated successfullt in DB after updation", async () => {
    const response = await request(app)
      .post("/api/user/signuptwo")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);

    let data = await User.findOne({ email: updateData.email }).exec();

    expect(data.steamId).toBe("23e6a0eb2d7870e8b56df9b2295262b9");
    expect(data.discordUserName).toBe("discordUserName");
  }, 70000);

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .post("/api/user/signuptwo")
      .send(updateData)
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  }, 70000);

  it("should return 401 status if user is not authorised, passing wrong auth token", async () => {
    const response = await request(app)
      .post("/api/user/signupthree")
      .set("Authorization", `Bearer 123`)
      .send(updateData)
      .expect(401);

    expect(response.body.message).toBe("Not Authorised!");
  });
}, 70000);
