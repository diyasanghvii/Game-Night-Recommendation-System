const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");
const { comparePasswords } = require("../../utils/authHelpers");

describe("Testing secured signup with encrypted password", () => {
  const paramBody = {
    name: "Encryption User",
    email: "encryption@test.com",
    password: "asdfgh@123",
  };

  const loginData = {
    email: "encryption@test.com",
    password: "asdfgh@123",
  };

  const loginDataPasswordWrong = {
    email: "encryption@test.com",
    password: "asdfgh@1234",
  };

  const loginDataPasswordUserName = {
    email: "encryption123@test.com",
    password: "asdfgh@1234",
  };

  beforeEach(async () => {
    await request(app).post("/user/signupone").send(paramBody).expect(200);
  });

  afterEach(async () => {
    await User.deleteOne({ email: paramBody.email });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Password should be hidden after creation", async () => {
    const user = await User.findOne({ email: paramBody.email });

    expect(user.password === "asdfgh@1234").toBe(false);
  });

  it("should return 200 when compared passwords using bcrypt compare function", async () => {
    const user = await User.findOne({ email: paramBody.email });
    const hashedPassword = await comparePasswords("asdfgh@123", user.password);

    expect(hashedPassword).toBe(true);
  });

  it("should return 200 for correct password in login API", async () => {
    const response = await request(app)
      .post("/user/login")
      .send(loginData)
      .expect(200);

    expect(response.body.message).toBe("Login Sucessful!");
  });

  it("should return 401, incorrect password when sent incorrect password", async () => {
    const response = await request(app)
      .post("/user/login")
      .send(loginDataPasswordWrong)
      .expect(401);

    expect(response.body.message).toBe("Invalid Password, Try again!");
  });

  it("should return 401, incorrect Credientials when sent username which does not exist", async () => {
    const response = await request(app)
      .post("/user/login")
      .send(loginDataPasswordUserName)
      .expect(401);

    expect(response.body.message).toBe("Invalid Credientials, Try again!");
  });
});
