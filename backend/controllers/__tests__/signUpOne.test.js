const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Sign up step one page testing", () => {
  const paramBody = {
    name: "SER test case admin",
    email: "signupOneTest@test.com",
    password: "123123",
  };

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("should return 200 status and success message after user creation", async () => {
    const response = await request(app)
      .post("/api/user/signupone")
      .send(paramBody)
      .expect(200);

    expect(response.body.message).toBe("Account Created Successfully!");
  }, 70000);

  it("should return 400 status if user already present in the DB", async () => {
    const response = await request(app)
      .post("/api/user/signupone")
      .send(paramBody)
      .expect(400);

    expect(response.body.message).toBe("User Already Exists!");
  }, 70000);
});