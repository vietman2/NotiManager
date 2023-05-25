import { renderWithProviders } from "../../test-utils/mocks";
import { fireEvent, screen } from "@testing-library/react";
import HistoryTable from "./HistoryTable";
import preloadedState from "../../test-utils/mock_state";
import axios from "axios";

describe("HistoryTable", () => {
  it("should render with data", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          results: [
            {
              id: 1,
              project: "test",
              target: "test",
              status: "SUCCESS",
              type: "EMAIL",
              created_at: "2021-05-04T14:11:20.000Z",
              reserved_at: "2021-05-04T14:11:20.000Z",
            },
          ],
          next: "http://0.0.0.0:8000/api/notification/?page=1&page_size=10",
          previous: null,
          count: 1,
        },
      });
    });
    renderWithProviders(<HistoryTable />, { preloadedState });
  });

  it("should render with data: error", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.reject();
    });
    renderWithProviders(<HistoryTable />);
  });

  it("should handle categories", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          results: [
            {
              id: 1,
              status: "SUCCESS",
              type: "EMAIL",
              message: "test",
              created_at: "2021-05-04T14:11:20.000Z",
            },
          ],
          next: null,
          previous: null,
        },
      });
    });
    renderWithProviders(<HistoryTable />, {
      preloadedState,
    });
    const status = screen.getByTestId("click Status");
    fireEvent.click(status);
    fireEvent.click(screen.getByText("Success"));
    fireEvent.click(status);
    fireEvent.click(screen.getByText("Failure"));

    const type = screen.getByTestId("click Type");
    fireEvent.click(type);
    fireEvent.click(screen.getByText("Email"));
    fireEvent.click(type);
    fireEvent.click(screen.getByText("Slack"));
    fireEvent.click(type);
    fireEvent.click(screen.getByText("SMS"));
    fireEvent.click(type);
    fireEvent.click(screen.getByText("Webhook"));
  });

  it("should handle page change", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          results: [
            {
              id: 1,
              project: "test1",
              target: "test",
              status: "SUCCESS",
              type: "EMAIL",
              created_at: "2021-05-04T14:11:20.000Z",
              reserved_at: "2021-05-04T14:11:20.000Z",
            },
            {
              id: 2,
              project: "test",
              target: "test",
              status: "FAILURE",
              type: "EMAIL",
              created_at: "2021-05-04T14:11:20.000Z",
              reserved_at: "2021-05-04T14:11:20.000Z",
            },
            {
              id: 3,
              project: "test",
              target: "test",
              status: "PENDING",
              type: "EMAIL",
              created_at: "2021-05-04T14:11:20.000Z",
              reserved_at: "2021-05-04T14:11:20.000Z",
            },
          ],
          next: "http://0.0.0.0:8000/api/notification/?page=1&page_size=10",
          previous: null,
          count: 1,
        },
      });
    });

    renderWithProviders(<HistoryTable />, {
      preloadedState: {
        notification: {
          totalNumber: 300,
          totalSuccess: 0,
          totalFailure: 0,
          selectedNotification: null,
          notifications_selectedProject: [],
        },
      },
    });

    await screen.findByText("test1");

    fireEvent.click(screen.getByTitle("Next page"));
    fireEvent.click(screen.getByTitle("Previous page"));
  });
});
