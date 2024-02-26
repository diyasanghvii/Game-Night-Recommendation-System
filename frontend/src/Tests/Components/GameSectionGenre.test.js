import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GameSectionGenre from "../../Components/GameSectionGenre/GameSectionGenre";
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

describe('GameSectionGenre component', () => {
    const genres = ['Action', 'Adventure', 'RPG'];
    const title = 'Preferred Genres';
  
    test('calls onEditGenre function when "Edit Genre" button is clicked', () => {
        const onEditGenreMock = jest.fn();
        const { getByText } = render(
          <GameSectionGenre title={title} genres={genres} onEditGenre={onEditGenreMock} games={[]} />
        );
      
        fireEvent.click(getByText('Edit Genre'));
      
        expect(onEditGenreMock).toHaveBeenCalled();
      });
      
      
  });