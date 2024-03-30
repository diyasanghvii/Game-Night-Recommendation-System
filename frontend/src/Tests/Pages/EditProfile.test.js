import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditProfile from "../../Pages/EditProfile";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('EditProfile component', () => {
  it('renders EditProfile component', () => {
    const { getByText } = render(<EditProfile />);
    const editButton = getByText('Edit');
    expect(editButton).toBeInTheDocument();
  });

  it('displays initial profile information', () => {
    const { getByLabelText } = render(<EditProfile />);
    expect(getByLabelText('Name')).toHaveValue('Testuser');
    expect(getByLabelText('Age')).toHaveValue('23');
    expect(getByLabelText('Email ID')).toHaveValue('testuser@gmail.com');
    expect(getByLabelText('Steam ID')).toHaveValue('1234455677223');
    expect(getByLabelText('Discord Username')).toHaveValue('test_user45');
  });

  it('enables editing when clicking the Edit button', () => {
    const { getByText, getByLabelText } = render(<EditProfile />);
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    expect(getByLabelText('Name')).toBeEnabled();
    expect(getByLabelText('Age')).toBeEnabled();
    expect(getByLabelText('Email ID')).toBeEnabled();
    expect(getByLabelText('Steam ID')).toBeEnabled();
    expect(getByLabelText('Discord Username')).toBeEnabled();
  });

  it('cancels editing and retains original profile information', () => {
    const { getByText, getByLabelText } = render(<EditProfile />);
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    fireEvent.change(getByLabelText('Name'), { target: { value: 'NewName' } });
    fireEvent.change(getByLabelText('Age'), { target: { value: '30' } });
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(getByLabelText('Name')).toHaveValue('Testuser');
    expect(getByLabelText('Age')).toHaveValue('23');
  });

  it('saves edited profile information', () => {
    const { getByText, getByLabelText } = render(<EditProfile />);
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    fireEvent.change(getByLabelText('Name'), { target: { value: 'NewName' } });
    fireEvent.change(getByLabelText('Age'), { target: { value: '30' } });
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    expect(getByLabelText('Name')).toHaveValue('NewName');
    expect(getByLabelText('Age')).toHaveValue('30');
  });
});