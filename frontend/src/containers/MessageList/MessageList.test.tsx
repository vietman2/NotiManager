import { renderWithProviders } from "../../test-utils/mocks";
import MessageListTable from "./MessageList";
import { fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import preloadedState from "../../test-utils/mock_state";

describe("MessageList", () => {
  it("should  render correct", () => {
    renderWithProviders(<MessageListTable />);
  });

  it("tab", () => {
    renderWithProviders(<MessageListTable />);

    const tabButton = screen.getByTestId("tab-1");
    fireEvent.click(tabButton);

    const tabButton2 = screen.getByTestId("tab-2");
    fireEvent.click(tabButton2);

    const tabButton3 = screen.getByTestId("tab-3");
    fireEvent.click(tabButton3);

    const tabButton4 = screen.getByTestId("tab-0");
    fireEvent.click(tabButton4);
  });

  it("should handle click create button", () => {
    renderWithProviders(<MessageListTable />);
    const createButton = screen.getByTestId("create-button");
    fireEvent.click(createButton);
    userEvent.keyboard("{esc}");
  });

  it("should handle open menu", async () => {
    renderWithProviders(<MessageListTable />, { preloadedState });

    const tabButton4 = screen.getByTestId("tab-0");
    fireEvent.click(tabButton4);

    const menuButton = screen.getByTestId("open-menu-button");
    await fireEvent.click(menuButton);
  });
  
  it("should handle close menu", () => {
    renderWithProviders(<MessageListTable />, { preloadedState });

    const tabButton4 = screen.getByTestId("tab-0");
    fireEvent.click(tabButton4);

    const menuButton = screen.getByTestId("open-menu-button");
    fireEvent.click(menuButton);

    userEvent.keyboard("{esc}");
  });

  it("should handle delete message", () => {
    jest.spyOn(axios, "delete").mockImplementation((url: string) => {
      return Promise.resolve();
    });
    renderWithProviders(<MessageListTable />, { preloadedState });

    const tabButton4 = screen.getByTestId("tab-0");
    fireEvent.click(tabButton4);

    const menuButton = screen.getByTestId("open-menu-button");
    fireEvent.click(menuButton);

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
  });
  
});
