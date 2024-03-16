import { isValidDiscordUsername } from "../../Utils";

describe("isValidDiscordUsername", () => {
  it("Return true for valid discord name", () => {
    const response = isValidDiscordUsername("test_user");
    expect(response).toBe(true);
  });

  it("Return true for valid discord name", () => {
    const response = isValidDiscordUsername("testUserOne");
    expect(response).toBe(true);
  });

  it("Return false for les than 2 character name", () => {
    const response = isValidDiscordUsername("t");
    expect(response).toBe(false);
  });

  it("Return false for @ at the start", () => {
    const response = isValidDiscordUsername("@test_user");
    expect(response).toBe(false);
  });

  it("Return false for # at the start", () => {
    const response = isValidDiscordUsername("#test_user");
    expect(response).toBe(false);
  });

  it("Return false for : at the start", () => {
    const response = isValidDiscordUsername(":test_user");
    expect(response).toBe(false);
  });

  it("Return false for character greater than 32", () => {
    const response = isValidDiscordUsername(
      "test_user_test_user_test_user_test_user"
    );
    expect(response).toBe(false);
  });

  it("Return false for discord, everyone, here as name", () => {
    const response = isValidDiscordUsername("discord");
    const response1 = isValidDiscordUsername("everyone");
    const response2 = isValidDiscordUsername("here");
    expect(response).toBe(false);
    expect(response1).toBe(false);
    expect(response2).toBe(false);
  });
});
