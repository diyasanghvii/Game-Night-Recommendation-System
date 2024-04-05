const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");
const { encryptData } = require("../../utils/encryptionUtils");

describe("Verify User Steam ID testing", () => {
  const paramBody = {
    name: "Verify User Steam",
    email: "verifyUserSteamID@test.com",
    password: "123123",
  };

  const steamID = "76561199642434117";
  const encryptedSteamId = encodeURIComponent(encryptData(steamID));

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

  it("should return 200 status and successfult verify Correct Steam ID", async () => {
    const response = await request(app)
      .get(`/user/verifyusersteamid?steamId=${encryptedSteamId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.message).toBe("Steam Id Valid!");
  });

  it("should return 400 status and invalid Steam ID", async () => {
    const response = await request(app)
      .get("/user/verifyusersteamid?steamId=abcd")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(500);

    expect(response.body.message).toBe(undefined);
  });

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .get("/user/verifyusersteamid")
      .send()
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  });
});
