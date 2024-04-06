import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxList from "../../Components/CheckboxList/CheckboxList";
const mockItems = [
  { id: 1, name: "John Doe", username: "johndoe123" },
  { id: 2, name: "Jane Smith", username: "janesmith456" },
];

describe("CheckboxList", () => {
  it("renders the list correctly", () => {
    render(<CheckboxList items={mockItems} />);
    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.username)).toBeInTheDocument();
    });
  });

  it("handles checkbox toggle correctly", () => {
    const mockToggle = jest.fn();
    render(<CheckboxList items={mockItems} onCheckboxToggle={mockToggle} />);
    const checkbox = screen.getByRole("checkbox", { name: /john doe/i });
    fireEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalledWith(mockItems[0]);
  });

  it("renders divider between list items", () => {
    render(<CheckboxList items={mockItems} />);
    expect(screen.getAllByRole("separator")).toHaveLength(mockItems.length - 1);
  });

  it("does not call toggle function if checkbox is disabled", () => {
    const mockToggle = jest.fn();
    render(
      <CheckboxList
        items={mockItems}
        onCheckboxToggle={mockToggle}
        disableCheckbox={true} 
      />
    );
    const checkbox = screen.getByRole("checkbox", { name: /john doe/i });
    fireEvent.click(checkbox);
  });

  it("renders without dividers if there is only one item", () => {
    const singleItem = [{ id: 1, name: "John Doe", username: "johndoe123" }];
    render(<CheckboxList items={singleItem} />);
    expect(screen.queryAllByRole("separator")).toHaveLength(0);
  });
});
