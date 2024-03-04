import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckboxList from "../../Components/CheckboxList/CheckboxList";

const items = [
  { name: "John Doe", username: "john.doe" },
  { name: "Jane Smith", username: "jane.smith" },
];

test("renders CheckboxList component", () => {
  const { getByText } = render(<CheckboxList items={items} />);

  expect(getByText("John Doe")).toBeInTheDocument();
  expect(getByText("john.doe")).toBeInTheDocument();
  expect(getByText("Jane Smith")).toBeInTheDocument();
  expect(getByText("jane.smith")).toBeInTheDocument();
});

test("handles checkbox toggle", () => {
  const { getByLabelText } = render(<CheckboxList items={items} />);

  expect(getByLabelText("John Doe")).not.toBeChecked();
  expect(getByLabelText("Jane Smith")).not.toBeChecked();

  fireEvent.click(getByLabelText("John Doe"));

  expect(getByLabelText("John Doe")).toBeChecked();
  fireEvent.click(getByLabelText("Jane Smith"));

  expect(getByLabelText("Jane Smith")).toBeChecked();
});