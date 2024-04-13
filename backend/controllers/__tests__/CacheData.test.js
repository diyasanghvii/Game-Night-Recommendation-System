const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Cache Data Feature testing", () => {
  const paramBody = {
    name: "Cache",
    email: "cacheData@test.com",
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

  it("Data Should be successfully cached", async () => {
    let userInfo = await User.findOne({ email: paramBody.email }).exec();
    await userInfo.updateOne({
      steamGames: [
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
    });

    const response = await request(app)
      .get("/api/steam/getUserSteamGameList")
      .set("Authorization", `Bearer ${authToken}`)
      .send()
      .expect(200);

    expect(response.body.steamGames.length).toBe(3);
  });

  it("should return 401 status if user is not authorised, Not passing auth token", async () => {
    const response = await request(app)
      .get("/api/steam/getUserSteamGameList")
      .send()
      .expect(401);

    expect(response.body.message).toBe("Not Authorised, No token!");
  });
});
