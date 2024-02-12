const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Login API", () => {
  const userData = {
    name: "Test User",
    email: "testemail",
    password: "testpwd",
  };

  beforeEach(async () => {
    await request(app).post("/user/signupone").send(userData).expect(200);
  });

  afterEach(async () => {
    await User.deleteOne({ email: userData.email });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should respond with a 200 status and success message for valid credentials", async () => {
    const response = await request(app)
      .post("/user/login")
      .send(userData)
      .expect(200);

    expect(response.body.message).toBe("Login Sucessful!");
  });

  it("should respond with a 401 status and error message for invalid Password", async () => {
    const invalidUserData = {
      email: "testemail",
      password: "wrongpassword",
    };

    const response = await request(app)
      .post("/user/login")
      .send(invalidUserData)
      .expect(401);

    expect(response.body.message).toBe("Invalid Password, Try again!");
  });

  it("should respond with a 401 status and error message for non-existent user", async () => {
    const nonExistentUserData = {
      email: "not-a-user",
      password: "testpwd",
    };

    const response = await request(app)
      .post("/user/login")
      .send(nonExistentUserData)
      .expect(401);

    expect(response.body.message).toBe("Invalid Credientials, Try again!");
  });

  it("should respond with a 401 status and error message for missing credentials", async () => {
    const response = await request(app).post("/user/login").expect(401);

    expect(response.body.message).toBe("Invalid Credientials, Try again!");
  });
});
