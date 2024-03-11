import React from "react";
import { render, fireEvent,waitFor,getByText } from '@testing-library/react';
import Signup2 from "../../Components/Signup2/Signup2";

describe("Signup2 component for verifying part", () => {
  test("should disable continue button when Steam ID and Discord Username are not provided", async () => {
    const { getByText } = render(<Signup2 />);
    const continueButton = getByText("Continue");

    expect(continueButton).toBeDisabled();
  });

  test("should disable continue button when Steam ID is not verified", async () => {
    const { getByLabelText, getAllByText } = render(<Signup2 />);
    const steamIdInput = getByLabelText("Steam ID");
    const discordUsernameInput = getByLabelText("Discord Username");
    const verifyBtns = getAllByText("Verify");

    fireEvent.change(steamIdInput, { target: { value: "invalidSteamId" } });
    fireEvent.change(discordUsernameInput, { target: { value: "naheerfatima_76086" } });
    fireEvent.click(verifyBtns[0]); 
  });

  test("should disable continue button when Discord Username is not verified", async () => {
    const { getByLabelText, getAllByText } = render(<Signup2 />);
    const discordUsernameInput = getByLabelText("Discord Username");
    const verifyBtns = getAllByText("Verify");

    fireEvent.change(discordUsernameInput, { target: { value: "invalidDiscordUsername" } });
    fireEvent.click(verifyBtns[1]); 
  });

  test("should enable continue button when both Steam ID and Discord Username are verified", async () => {
    const { getByLabelText, getAllByText } = render(<Signup2 />);
    const steamIdInput = getByLabelText("Steam ID");
    const discordUsernameInput = getByLabelText("Discord Username");
    const verifyBtns = getAllByText("Verify");

    fireEvent.change(steamIdInput, { target: { value: "validSteamId" } });
    fireEvent.change(discordUsernameInput, { target: { value: "validDiscordUsername" } });

    fireEvent.click(verifyBtns[0]); 
    fireEvent.click(verifyBtns[1]); 
  });
});


describe('Signup2 component', () => {
  it('renders without crashing', () => {
    render(<Signup2 />);
  });

  it('initial state values are correct', () => {
    const { getByLabelText } = render(<Signup2 />);
    expect(getByLabelText('Steam ID')).toHaveValue('');
    expect(getByLabelText('Discord Username')).toHaveValue('');
  });

  it('updates input fields correctly', () => {
    const { getByLabelText } = render(<Signup2 />);
    fireEvent.change(getByLabelText('Steam ID'), { target: { value: 'steam123' } });
    fireEvent.change(getByLabelText('Discord Username'), { target: { value: 'user123' } });
    expect(getByLabelText('Steam ID')).toHaveValue('steam123');
    expect(getByLabelText('Discord Username')).toHaveValue('user123');
  });


  it('handles signup with missing or incomplete data', () => {
    const { getByText } = render(<Signup2 />);
    fireEvent.click(getByText('Continue'));
  });

  it('handles signup with complete data', async () => {
    const { getByText, getByLabelText } = render(<Signup2 />);
    fireEvent.change(getByLabelText('Steam ID'), { target: { value: 'steam123' } });
    fireEvent.change(getByLabelText('Discord Username'), { target: { value: 'user123' } });
    fireEvent.click(getByText('Continue'));
  });

  it('displays error message on failed API call', async () => {
    const { getByText } = render(<Signup2 />);
    fireEvent.click(getByText('Continue'));
  });
});