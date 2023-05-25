import { fireEvent, screen } from "@testing-library/react";
import TargetListTable from "./TargetList";
import { renderWithProviders } from "../../test-utils/mocks";
import userEvent from "@testing-library/user-event";
import axios from "axios";

describe("TargetList", () => {
  it("renders correctly", () => {
    renderWithProviders(<TargetListTable />);
  });

  it("should handle click create button", () => {
    renderWithProviders(<TargetListTable />);
    const createButton = screen.getByTestId("create-button");
    fireEvent.click(createButton);
    userEvent.keyboard("{esc}");
  });

  it("should render webhook table correctly", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {
                api_key: "test",
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-2"));
  });

  it("should render email table correctly", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "EMAIL",
              endpoint: "test",
              data: {},
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-1"));
  });

  it("should render sms table correctly", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "SMS",
              endpoint: "test",
              data: {},
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-3"));
  });

  it("should render slack table correctly", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "SLACK",
              endpoint: "test",
              data: {
                channel: "test",
                message: "test",
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-0"));
  });

  it("should handle click button", () => {
    renderWithProviders(<TargetListTable />);
    fireEvent.click(screen.getByTestId("create-button"));
  });

  it("should handle row click: webhook, empty auth", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {},
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-2"));

    fireEvent.click(screen.getByTestId("table-row-1"));
    fireEvent.click(screen.getByTestId("table-row-1"));
  });

  it("should handle row click: webhook, no auth", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {
                auth: "no_auth"
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-2"));

    fireEvent.click(screen.getByTestId("table-row-1"));
  });

  it("should handle row click: webhook, basic auth", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {
                auth: "basic"
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-2"));

    fireEvent.click(screen.getByTestId("table-row-1"));
    fireEvent.click(screen.getByTestId("table-row-1"));
  });

  it("should handle row click: webhook, bearer auth", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {
                auth: "bearer"
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-2"));

    fireEvent.click(screen.getByTestId("table-row-1"));
    fireEvent.click(screen.getByTestId("table-row-1"));
  });

  it("should handle row click: webhook, apikey auth", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {
                auth: "api_key"
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-2"));

    fireEvent.click(screen.getByTestId("table-row-1"));
    fireEvent.click(screen.getByTestId("table-row-1"));
  });

  it("should handle open and close menu", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {},
            },
          ],
          selectedTarget: null,
        },
      },
    });

    fireEvent.click(screen.getByTestId("open-menu-button"));
    userEvent.keyboard("{esc}");
  });

  it("should handle delete", async () => {
    axios.delete = jest.fn().mockResolvedValue({ data: {} });
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {},
            },
          ],
          selectedTarget: null,
        },
      },
    });

    fireEvent.click(screen.getByTestId("open-menu-button"));
    fireEvent.click(screen.getByTestId("delete-button"));
  });

  it("should handle edit", async () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test@test.com",
              data: {},
            },
          ],
          selectedTarget: null,
        },
      },
    });

    fireEvent.click(screen.getByTestId("open-menu-button"));
    fireEvent.click(screen.getByTestId("edit-button"));
  });
});
