const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Testing User Modal Schema", () => {
  const paramBody = {
    name: "User Modal Name",
    email: "user@test.com",
    password: "123@123",
    steamId: "steam@123",
    discordId: "discordId@123",
    webhookUrl: "webhookUrlURL",
    preferredGenres: ["Action", "Sports"],
    preferences: [
      { gameName: "Pubg", ratings: "4.5" },
      { gameName: "minecraft", ratings: "2.5" },
      { gameName: "NFS", ratings: "5" },
      { gameName: "Temple Run", ratings: "1.3" },
    ],
  };

  beforeAll(async () => {
    const newUser = new User(paramBody);
    await newUser.save();
  });

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("discordId Should be present for the user", async () => {
    const user = await User.findOne({ email: paramBody.email });
    expect(user.discordId).toBe("discordId@123");
  });

  it("steamId Should be present for the user", async () => {
    const user = await User.findOne({ email: paramBody.email });
    expect(user.steamId).toBe("steam@123");
  });

  it("webhookUrl Should be present for the user", async () => {
    const user = await User.findOne({ email: paramBody.email });
    expect(user.webhookUrl).toBe("webhookUrlURL");
  });

  it("preferredGenres Should be present for the user", async () => {
    const user = await User.findOne({ email: paramBody.email });
    expect(user.preferredGenres.length).toBe(2);
  });

  it("preferences Should be present for the user", async () => {
    const user = await User.findOne({ email: paramBody.email });
    expect(user.preferences.length).toBe(4);
  });
});