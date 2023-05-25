import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import ProjectDetail from "./ProjectDetail";
import { renderWithProviders } from "../../../test-utils/mocks";

describe("ProjectDetail", () => {
  it("should handle create notification button click", () => {
    renderWithProviders(
      <MemoryRouter>
        <ProjectDetail />
      </MemoryRouter>
    );

    userEvent.click(screen.getByTestId("createNotificationButton"));
  });

  it("should handle close multi step form button click", () => {
    renderWithProviders(
      <MemoryRouter>
        <ProjectDetail />
      </MemoryRouter>
    );

    userEvent.click(screen.getByTestId("createNotificationButton"));
    userEvent.keyboard("{esc}");
  });
});
