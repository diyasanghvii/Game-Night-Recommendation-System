const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Sign up step two update API testing", () => {
  const paramBody = {
    name: "SER test case admin",
    email: "signupTotest@test.com",
    password: "123123",
  };

  const updateData = {
    email: "signupTotest@test.com",
    preferredGenres: ["Action", "Sports", "Adventure"],
    preferences: [
      {
        gameName: "Pubg",
        ratings: "4.5",
      },
      {
        gameName: "Night",
        ratings: "1.5",
      },
      {
        gameName: "NFS",
        ratings: "2.5",
      },
    ],
  };

  const updateDataInvalid = {
    email: "sertestcase11@test.com",
    preferredGenres: ["Action", "Sports", "Adventure"],
    preferences: [
      {
        gameName: "Pubg",
        ratings: "4.5",
      },
      {
        gameName: "Night",
        ratings: "1.5",
      },
      {
        gameName: "NFS",
        ratings: "2.5",
      },
    ],
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
      .post("/api/user/signupthree")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);

    expect(response.body.message).toBe("Updated User Preferences Successfully");
  }, 70000);

  it("should return 400 status if user is not present in the DB", async () => {
    const response = await request(app)
      .post("/api/user/signupthree")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateDataInvalid)
      .expect(400);

    expect(response.body.message).toBe("User Does Not Exists!");
  }, 70000);

  it("data should be updated successfullt in DB after updation", async () => {
    const response = await request(app)
      .post("/api/user/signupthree")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);

    let data = await User.findOne({ email: updateData.email }).exec();

    expect(data.preferredGenres).toStrictEqual([
      "Action",
      "Sports",
      "Adventure",
    ]);
    expect(data.preferences[0].gameName).toBe("Pubg");
  }, 70000);

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .post("/api/user/signupthree")
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
  }, 70000);
});
