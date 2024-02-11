import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Signup2 from "../../Components/Signup2/Signup2";

describe('Signup2 Component', () => {
  test('renders the Signup2 component', () => {
    const { queryAllByText, getByLabelText } = render(<Signup2 />);
    
    // Assert that at least one "Verify" button is present
    const verifyButtons = queryAllByText('Verify');
    expect(verifyButtons.length).toBeGreaterThanOrEqual(1);
 
    // Assert that all input fields are present
    expect(getByLabelText('Steam ID')).toBeInTheDocument();
    expect(getByLabelText('Discord ID')).toBeInTheDocument();
    expect(getByLabelText('Discord Webhook URL')).toBeInTheDocument();
  });

  test('handles signup process without Steam ID and Discord ID', () => {
    const { getByText } = render(<Signup2 />);
    
    // Click the Continue button without providing Steam ID and Discord ID
    fireEvent.click(getByText('Continue'));
    
    // Assert that the warning message is displayed
    expect(getByText('Please provide your Steam ID and Discord ID.')).toBeInTheDocument();
  });

  test('handles signup process without Steam ID', () => {
    const { getByText, getByLabelText } = render(<Signup2 />);
    
    // Enter Discord ID
    fireEvent.change(getByLabelText('Discord ID'), { target: { value: 'mydiscordid' } });
    
    // Click the Continue button without providing Steam ID
    fireEvent.click(getByText('Continue'));
    
    // Assert that the error message is displayed
    expect(getByText('Please provide your Steam ID.')).toBeInTheDocument();
  });

  test('handles signup process without Discord ID', () => {
    const { getByText, getByLabelText } = render(<Signup2 />);
    
    // Enter Steam ID
    fireEvent.change(getByLabelText('Steam ID'), { target: { value: 'mysteamid' } });
    
    // Click the Continue button without providing Discord ID
    fireEvent.click(getByText('Continue'));
    
    // Assert that the error message is displayed
    expect(getByText('Please provide your Discord ID.')).toBeInTheDocument();
  });

});