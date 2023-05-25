import { renderWithProviders } from "../../test-utils/mocks";
import TableHead from "./TableHead";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import preloadedState from "../../test-utils/mock_state";

describe("TableHead", () => {
  it("should render", () => {
    renderWithProviders(<TableHead />);
  });

  it("should handle type open and close", () => {
    renderWithProviders(<TableHead />);
    const typeButton = screen.getByTestId("click Type");
    fireEvent.click(typeButton);
    userEvent.keyboard("{esc}");
  });

  it("should handle status open and close", () => {
    renderWithProviders(<TableHead />);
    const statusButton = screen.getByTestId("click Status");
    fireEvent.click(statusButton);
    userEvent.keyboard("{esc}");
  });

  it("should handle type click", () => {
    renderWithProviders(<TableHead />, { preloadedState });
    const typeButton = screen.getByTestId("click Type");
    fireEvent.click(typeButton);
    const typeCheckbox = screen.getByTestId("click Slack");
    fireEvent.click(typeCheckbox);
  });

  it("should handle status click", () => {
    renderWithProviders(<TableHead />, { preloadedState });
    const statusButton = screen.getByTestId("click Status");
    fireEvent.click(statusButton);
    const statusCheckbox = screen.getByTestId("click Success");
    fireEvent.click(statusCheckbox);
  });

});
