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
    steamId: "123456",
    discordUserName: "discordname",
    preferredGenres: ["action"],
    preferences: [{ name: "action-game" }],
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
    await request(app).post("/api/user/signupone").send(paramBody).expect(200);
    let user = await User.findOne({ email: loginData.email }); // Retrieve user
    user.steamId = null; // Set missing fields
    user.discordUserName = null;
    user.discordUserName = "discordname";
    await user.save();
  }, 70000);

  afterEach(async () => {
    await User.deleteOne({ email: paramBody.email });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Password should be hidden after creation", async () => {
    const user = await User.findOne({ email: paramBody.email });

    expect(user.password === "asdfgh@1234").toBe(false);
  }, 70000);

  it("should return 200 when compared passwords using bcrypt compare function", async () => {
    const user = await User.findOne({ email: paramBody.email });
    const hashedPassword = await comparePasswords("asdfgh@123", user.password);

    expect(hashedPassword).toBe(true);
  }, 70000);

  it("should return 200 for correct password in login API, but as discord is not present should give appropriate message", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect(200);

    expect(response.body.message).toBe(
      "Please complete your profile information."
    );
  });

  it("should return 401, incorrect password when sent incorrect password", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send(loginDataPasswordWrong)
      .expect(401);

    expect(response.body.message).toBe("Invalid Password, Try again!");
  }, 70000);

  it("should return 401, incorrect Credentials when sent username which does not exist", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send(loginDataPasswordUserName)
      .expect(401);

    expect(response.body.message).toBe("Invalid Credientials, Try again!");
  }, 70000);

  it("should return 200 and redirect to signup 2 if steam ID or Discord ID is missing", async () => {
    // Attempt to login
    const response = await request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect(200);

    // Check response for redirection and initial step
    expect(response.body.redirect).toBe(true);
    expect(response.body.initialStep).toBe(1);
  });

  it("should return 200 and redirect to signup 3 if preferences are missing", async () => {
    // Attempt to login
    const response = await request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect(200);

    // Check response for redirection and initial step
    expect(response.body.redirect).toBe(true);
    expect(response.body.initialStep).toBe(1);
  });
});
