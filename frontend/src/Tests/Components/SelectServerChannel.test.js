import React from "react";
import { render } from "@testing-library/react";
import SelectServerChannel from "../../Components/SelectServerChannel/SelectServerChannel";

jest.mock("../../Services/index", () => ({
  GetServerList: jest.fn(() =>
    Promise.resolve({ data: { serverList: ["Server 1", "Server 2"] } })
  ),
  GetChannelList: jest.fn(() =>
    Promise.resolve({ data: { voiceChannels: ["Channel 1", "Channel 2"] } })
  ),
}));

const mockOnServerChange = jest.fn();
const mockOnChannelChange = jest.fn();

describe("SelectServerChannel component", () => {
  it("renders without crashing", () => {
    render(
      <SelectServerChannel
        onServerChange={mockOnServerChange}
        onChannelChange={mockOnChannelChange}
      />
    );
  });
});

test("renders Select Server Channel component", () => {
  const { getByText } = render(
    <SelectServerChannel
      onServerChange={mockOnServerChange}
      onChannelChange={mockOnChannelChange}
    />
  );

  expect(getByText("Change Server/Channel")).toBeInTheDocument();
});