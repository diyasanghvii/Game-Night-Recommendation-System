import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SignUpIdDetails from '../../Pages/SignUpIdDetails';

jest.mock('../../Services', () => ({
  CheckUniqueSteamId: jest.fn(),
  CheckUniqueDiscordUserName: jest.fn(),
  VerifyUserSteamId: jest.fn(),
  SignUpTwo: jest.fn(),
}));
jest.mock('../../Utils', () => ({
  isValidDiscordUsername: jest.fn(() => true), 
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(), 
}));

describe('SignUpIdDetails Component', () => {
  test('renders TextBox component correctly', () => {
    render(<SignUpIdDetails />);
    const textBoxElement = screen.getByLabelText('Steam ID');
    expect(textBoxElement).toBeInTheDocument();
  });

  test('handles user input and updates state for Steam ID', () => {
    render(<SignUpIdDetails />);
    const textBoxElement = screen.getByLabelText('Steam ID');
    fireEvent.change(textBoxElement, { target: { value: '12345678901234567' } });
    expect(textBoxElement.value).toBe('12345678901234567');
  });
  test('renders Btn components correctly', () => {
    render(<SignUpIdDetails />);
    const verifyButtons = screen.getAllByText('Verify');
    expect(verifyButtons.length).toBe(2); 
  });

  test('calls onClick event handler when first Verify button is clicked', () => {
    render(<SignUpIdDetails />);
    const verifyButtons = screen.getAllByText('Verify');
    const firstVerifyButton = verifyButtons[0];
    fireEvent.click(firstVerifyButton);
  });
  test('displays error when Steam ID is not provided', async () => {
    render(<SignUpIdDetails />);
    const verifyButtons = screen.getAllByText('Verify');
    const secondVerifyButton = verifyButtons[0];
    fireEvent.click(secondVerifyButton);
    await act(async () => {});
  });
});
jest.mock('../../Services', () => ({
  CheckUniqueSteamId: jest.fn(),
  CheckUniqueDiscordUserName: jest.fn(),
  VerifyUserSteamId: jest.fn(),
  SignUpTwo: jest.fn(),
}));
jest.mock('../../Utils', () => ({
  isValidDiscordUsername: jest.fn(() => true), 
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('SignUpIdDetails Component', () => {
  test('renders Discord Username TextBox component correctly', () => {
    render(<SignUpIdDetails />);
    const discordUsernameElement = screen.getByLabelText('Discord Username');
    expect(discordUsernameElement).toBeInTheDocument();
  });

  test('handles user input and updates state for Discord Username', () => {
    render(<SignUpIdDetails />);
    const discordUsernameElement = screen.getByLabelText('Discord Username');
    fireEvent.change(discordUsernameElement, { target: { value: 'example#1234' } });
    expect(discordUsernameElement.value).toBe('example#1234');
  });

  test('calls onClick event handler when second Verify button is clicked', () => {
    render(<SignUpIdDetails />);
    const verifyButtons = screen.getAllByText('Verify');
    const firstVerifyButton = verifyButtons[1];
    fireEvent.click(firstVerifyButton);
  });
  test('displays error when Discord Username is not provided', async () => {
    render(<SignUpIdDetails />);
    const verifyButtons = screen.getAllByText('Verify');
    const secondVerifyButton = verifyButtons[1]; 
    fireEvent.click(secondVerifyButton);
    await act(async () => {});
    const errorMessage = screen.getByText('Please provide your Discord Username.');
    expect(errorMessage).toBeInTheDocument();
  });
});


