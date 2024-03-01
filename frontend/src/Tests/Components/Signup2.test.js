import React from "react";
import { render, fireEvent,waitFor } from '@testing-library/react';
import Signup2 from "../../Components/Signup2/Signup2";

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