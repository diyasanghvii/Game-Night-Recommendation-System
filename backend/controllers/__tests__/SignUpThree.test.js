const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User/userModal");
const mongoose = require("mongoose");

describe("Sign up step two update API testing", () => {
  const paramBody = {
    name: "SER test case admin",
    email: "sertestcase12@test.com",
    password: "123123",
  };

  const updateData = {
    email: "sertestcase12@test.com",
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

  beforeAll(async () => {
    await request(app).post("/user/signupone").send(paramBody).expect(200);
  });

  afterAll(async () => {
    await User.deleteOne({ email: paramBody.email });
    await mongoose.connection.close();
  });

  it("should return 200 status and success message after user step two updation", async () => {
    const response = await request(app)
      .post("/user/signupthree")
      .send(updateData)
      .expect(200);

    expect(response.body.message).toBe("Updated User Preferences Successfully");
  });

  it("should return 400 status if user is not present in the DB", async () => {
    const response = await request(app)
      .post("/user/signupthree")
      .send(updateDataInvalid)
      .expect(400);

    expect(response.body.message).toBe("User Does Not Exists!");
  });

  it("data should be updated successfullt in DB after updation", async () => {
    const response = await request(app)
      .post("/user/signupthree")
      .send(updateData)
      .expect(200);

    let data = await User.findOne({ email: updateData.email }).exec();

    expect(data.preferredGenres).toStrictEqual([
      "Action",
      "Sports",
      "Adventure",
    ]);
    expect(data.preferences[0].gameName).toBe("Pubg");
  });
});