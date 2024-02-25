import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditPreferences from "../../Pages/EditPreferences";
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter 


describe('EditPreferences component', () => {
    test('renders without crashing', async () => {
      render(
        <MemoryRouter> {/* Wrap component inside MemoryRouter */}
          <EditPreferences />
        </MemoryRouter>
      );
      // Assuming the component renders without errors if no exceptions are thrown
    });
  
    test('searching all games', async () => {
      render(
        <MemoryRouter> {/* Wrap component inside MemoryRouter */}
          <EditPreferences />
        </MemoryRouter>
      );
      // Your test logic for searching all games
    });
  
    test('searching your games', async () => {
      render(
        <MemoryRouter> {/* Wrap component inside MemoryRouter */}
          <EditPreferences />
        </MemoryRouter>
      );
      // Your test logic for searching your games
    });
  });