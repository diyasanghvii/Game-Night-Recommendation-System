const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Sign up step two update API testing", () => {
  const paramBody = {
    name: "SER test case admins",
    email: "sertestcases@test.com",
    password: "123123",
  };

  const updateData = {
    email: "sertestcases@test.com",
    steamId: "steamId",
    discordId: "discordId",
    webhookUrl: "webhookUrl",
  };

  const updateDataInvalid = {
    email: "sertestcases1@test.com",
    steamId: "steamId",
    discordId: "discordId",
    webhookUrl: "webhookUrl",
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

  it("should return 200 status and success message after user step two updation", async () => {
    const response = await request(app)
      .post("/user/signuptwo")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);

    expect(response.body.message).toBe("Updated User Information Successfully");
  });

  it("should return 400 status if user is not present in the DB", async () => {
    const response = await request(app)
      .post("/user/signuptwo")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateDataInvalid)
      .expect(400);

    expect(response.body.message).toBe("User Does Not Exists!");
  });

  it("data should be updated successfullt in DB after updation", async () => {
    const response = await request(app)
      .post("/user/signuptwo")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);

    let data = await User.findOne({ email: updateData.email }).exec();

    expect(data.steamId).toBe("steamId");
    expect(data.discordId).toBe("discordId");
    expect(data.webhookUrl).toBe("webhookUrl");
  });

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .post("/user/signuptwo")
      .send(updateData)
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  });

  it("should return 401 status if user is not authorised, passing wrong auth token", async () => {
    const response = await request(app)
      .post("/user/signupthree")
      .set("Authorization", `Bearer 123`)
      .send(updateData)
      .expect(401);

    expect(response.body.message).toBe("Not Authorised!");
  });
});
