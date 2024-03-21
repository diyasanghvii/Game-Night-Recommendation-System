import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditProfile from "../../Pages/EditProfile";
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter from react-router-dom

describe('EditProfile component', () => {
    it('renders without crashing', () => {
      render(
        <Router>
          <EditProfile />
        </Router>
      );
    });
  
    it('disables save button when not editing', async () => {
      const { queryByText } = render(
        <Router>
          <EditProfile />
        </Router>
      );
  
      // Check that the save button is not present when not editing
      const saveButton = queryByText('Save');
      expect(saveButton).toBeNull();
    });
  
    it('enables save button when editing', async () => {
      const { getByText } = render(
        <Router>
          <EditProfile />
        </Router>
      );
      fireEvent.click(getByText('Edit'));
  
      const saveButton = getByText('Save');
      expect(saveButton).toBeEnabled();
    });
  
    it('cancels editing and retains original profile information', async () => {
      const { getByText, getByLabelText } = render(
        <Router>
          <EditProfile />
        </Router>
      );
      fireEvent.click(getByText('Edit'));
  
      fireEvent.change(getByLabelText('Name'), { target: { value: 'NewName' } });
      fireEvent.change(getByLabelText('Age'), { target: { value: '30' } });
  
      fireEvent.click(getByText('Cancel'));
  
      expect(getByLabelText('Name')).toHaveValue('Testuser');
      expect(getByLabelText('Age')).toHaveValue('23');
    });
  
    it('saves edited profile information', async () => {
      const { getByText, getByLabelText } = render(
        <Router>
          <EditProfile />
        </Router>
      );
      fireEvent.click(getByText('Edit'));
  
      fireEvent.change(getByLabelText('Name'), { target: { value: 'NewName' } });
      fireEvent.change(getByLabelText('Age'), { target: { value: '30' } });
  
      fireEvent.click(getByText('Save'));
  
      expect(getByLabelText('Name')).toHaveValue('NewName');
      expect(getByLabelText('Age')).toHaveValue('30');
    });
  });