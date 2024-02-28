import React from "react";
import { render, fireEvent,waitFor } from '@testing-library/react';
import Signup2 from "../../Components/Signup2/Signup2";

describe("Signup2 component", () => {
  it("renders without crashing", () => {
    render(<Signup2 />);
  });

  
  it("displays error message when Discord Channel Name field is empty", () => {
    const { getByLabelText, getByText } = render(<Signup2 />);
    const steamIdInput = getByLabelText("Steam ID");
    const discordUsernameInput = getByLabelText("Discord Username");
    const discordServerNameInput = getByLabelText("Discord Server Name");
    fireEvent.change(steamIdInput, { target: { value: "123456" } });
    fireEvent.change(discordUsernameInput, { target: { value: "testUser" } });
    fireEvent.change(discordServerNameInput, { target: { value: "Server" } });
    const continueButton = getByText("Continue");
    fireEvent.click(continueButton);
    expect(getByText("Please enter Discord Channel Name.")).toBeInTheDocument();
  });

  it("updates Steam ID state when input changes", () => {
    const { getByLabelText } = render(<Signup2 />);
    const steamIdInput = getByLabelText("Steam ID");
    fireEvent.change(steamIdInput, { target: { value: "testSteamId" } });
    expect(steamIdInput.value).toBe("testSteamId");
  });

  it("updates Discord Username state when input changes", () => {
    const { getByLabelText } = render(<Signup2 />);
    const discordUsernameInput = getByLabelText("Discord Username");
    fireEvent.change(discordUsernameInput, { target: { value: "testUsername" } });
    expect(discordUsernameInput.value).toBe("testUsername");
  });

  it("updates Discord Server Name state when input changes", () => {
    const { getByLabelText } = render(<Signup2 />);
    const serverNameInput = getByLabelText("Discord Server Name");
    fireEvent.change(serverNameInput, { target: { value: "testServer" } });
    expect(serverNameInput.value).toBe("testServer");
  });

  it("updates Discord Channel Name state when input changes", () => {
    const { getByLabelText } = render(<Signup2 />);
    const channelNameInput = getByLabelText("Discord Channel Name");
    fireEvent.change(channelNameInput, { target: { value: "testChannel" } });
    expect(channelNameInput.value).toBe("testChannel");
  });
});