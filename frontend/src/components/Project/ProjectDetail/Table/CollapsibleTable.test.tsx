import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { renderWithProviders } from "../../../../test-utils/mocks";
import CollapsibleTable from "./CollapsibleTable";

describe("CollapsibleTable", () => {
  it("should render with empty notificationConfigs", () => {
    renderWithProviders(<CollapsibleTable notificationConfigs={[]} />);
  });

  it("should render with notificationConfigs", () => {
    renderWithProviders(
      <CollapsibleTable
        notificationConfigs={[
          {
            id: 1,
            project: 1,
            message: 1,
            type: "email",
            rrule: "FREQ=DAILY;DTSTART=20210901T000000Z;INTERVAL=1",
            mode: "before",
          },
        ]}
      />
    );
  });

  it("should handle click", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            id: 1,
            reserved_at: "2021-09-01T00:00:00Z",
          },
        ],
      });
    });
    renderWithProviders(
      <CollapsibleTable
        notificationConfigs={[
          {
            id: 1,
            project: 1,
            message: 1,
            type: "email",
            rrule: "FREQ=DAILY;DTSTART=20210901T000000Z;INTERVAL=1",
            mode: "before",
          },
        ]}
      />
    );

    fireEvent.click(screen.getByTestId("expand-button"));
    await waitFor(() => {
      expect(screen.getByText("2021-09-01T00:00:00Z")).toBeInTheDocument();
    });
  });

  it("should handle click: no rrule", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            id: 1,
            reserved_at: "2021-09-01T00:00:00Z",
          },
        ],
      });
    });
    renderWithProviders(
      <CollapsibleTable
        notificationConfigs={[
          {
            id: 1,
            project: 1,
            message: 1,
            type: "email",
            rrule: "",
            mode: "before",
          },
        ]}
      />
    );

    fireEvent.click(screen.getByTestId("expand-button"));
    await waitFor(() => {
      expect(screen.getByText("2021-09-01T00:00:00Z")).toBeInTheDocument();
    });
  });
});
