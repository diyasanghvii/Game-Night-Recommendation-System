import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditPreferences from "../../Pages/EditPreferences";
import { MemoryRouter } from 'react-router-dom';

describe('EditPreferences component', () => {
    test('renders without crashing', async () => {
      render(
        <MemoryRouter>
          <EditPreferences />
        </MemoryRouter>
      );
    });
  
    test('searching all games', async () => {
      render(
        <MemoryRouter>
          <EditPreferences />
        </MemoryRouter>
      );
    });
  
    test('searching your games', async () => {
      render(
        <MemoryRouter>
          <EditPreferences />
        </MemoryRouter>
      );
    });
  });
