import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PopupGenre from '../../Components/PopupGenre/PopupGenre';

describe('Popup component', () => {

  test('calls onClose function when "Cancel" button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<PopupGenre onClose={onCloseMock} />);
    const closeButton = screen.getByText('×');

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('calls handleSave function when "Save" button is clicked', () => {
    const onSelectionMock = jest.fn();
    const { getByText } = render(
      <PopupGenre genres={[]} onSelection={onSelectionMock} onClose={() => {}} />
    );
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
  });
  

  test('displays loading message while fetching genres', async () => {
    render(<PopupGenre onClose={() => {}} />);
    const loadingText = screen.getByText('Loading ...');
    expect(loadingText).toBeInTheDocument();
  });
});
