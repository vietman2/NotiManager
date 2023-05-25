import { fireEvent, screen } from "@testing-library/react";

import NotiSidebar from "./NotiSidebar";
import { renderWithProviders } from "../../test-utils/mocks";
import { MemoryRouter } from "react-router";
import preloadedState from "../../test-utils/mock_state";

describe("Sidebar Testing", () => {
  let sidebar: JSX.Element;

  beforeEach(() => {
    jest.clearAllMocks();
    sidebar = (
      <MemoryRouter initialEntries={["/home"]}>
        <NotiSidebar />
      </MemoryRouter>
    );
  });

  it("should render correctly", () => {
    const { container } = renderWithProviders(sidebar);
    expect(container).toBeTruthy();

    screen.getByText("Home");
    screen.getByText("Projects");
    screen.getByText("Targets");
    screen.getByText("Messages");
    screen.getByText("History");
  });

  it("should render user state correctly", () => {
    renderWithProviders(sidebar, { preloadedState });
  });

  it("should handle buttons", async () => {
    renderWithProviders(sidebar);

    const homeButton = screen.getByTestId("homeButton");
    const projectsButton = screen.getByTestId("projectsButton");
    const targetsButton = screen.getByTestId("targetsButton");
    const messagesButton = screen.getByTestId("messagesButton");
    const historyButton = screen.getByTestId("historyButton");

    fireEvent.click(homeButton);
    fireEvent.click(projectsButton);
    fireEvent.click(targetsButton);
    fireEvent.click(messagesButton);
    fireEvent.click(historyButton);
  });

  it("should handle logout", async () => {
    renderWithProviders(sidebar);

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);
  });
});
