import { renderWithProviders } from "../../../test-utils/mocks";
import Today from "./Today";
import preloadedState from "../../../test-utils/mock_state";
import axios from "axios";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("Today", () => {
  it("should render correctly: 0 notifications", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {},
      });
    });
    renderWithProviders(<Today />, { preloadedState });
  });  

  it("should render correctly: with notifications", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {},
      });
    });
    renderWithProviders(<Today />, {
      preloadedState: {
        notification: {
          totalNumber: 10,
          totalSuccess: 5,
          totalFailure: 5,
          selectedNotification: null,
          notifications_selectedProject: [],
        }
      }
    });
  });

  it("should render correctly: undefined (error)", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          most_recent_failure: "asdf",
          most_request_project: "undefined",
          most_used_channel: "EMAIL",
        },
      });
    });
    renderWithProviders(<Today />, {
      preloadedState: {
        project: {
          projects: [
            {
              id: 1,
              name: "test",
              project_type: "test",
              number_of_requests: 1,
              most_recently_sent_notification: "",
            },
          ],
          selectedProject: {
            id: 1,
            project_type: "test",
            name: "test",
          }
        },
        notification: {
          totalNumber: 10,
          totalSuccess: 5,
          totalFailure: 5,
          selectedNotification: null,
          notifications_selectedProject: [],
        }
      }
    });
  });
});
