const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");
describe("Discord Fetch Presence API testing", () => {
  const paramBody = {
    name: "Discord fetch Prsesence",
    email: "discordFetchPresenceTest112100@test.com",
    password: "123123",
  };

  let authToken;

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/user/signupone")
      .send(paramBody)
      .expect(200);

    let res = JSON.parse(response.text);
    authToken = res.token;
  });

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("should return 200 status and success message after fetching discord presence", async () => {
    const response = await request(app)
      .get("/api/discord/fetchpresence?targetGuildName=diya_san's test server&targetChannelName=Lobby")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.message).toBe(
      "Successfully fetched discord presence!"
    );
  }, 70000);

  it("should return 200 status and memberStatus should be array", async () => {
    const response = await request(app)
      .get("/api/discord/fetchpresence?targetGuildName=diya_san's test server&targetChannelName=Lobby")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.memberStatus).toBeInstanceOf(Array);
  }, 70000);

  it("should return 200 status and success message after fetching presence member list greater than one", async () => {
    const response = await request(app)
      .get("/api/discord/fetchpresence?targetGuildName=diya_san's test server&targetChannelName=Lobby")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);


    expect(response.body.memberStatus.length).toBeGreaterThan(0);
  }, 70000);

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .get("/api/discord/fetchpresence?targetGuildName=diya_san's test server&targetChannelName=Lobby")
      .send()
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  }, 70000);
});
