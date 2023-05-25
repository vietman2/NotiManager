import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { renderWithProviders } from "../../../test-utils/mocks";
import BarLineAnalytics from "./BarLineAnalytics";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("BarLineAnalytics", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-12-08T00:00:00Z").getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const response = [
    {
      status: "FAILURE",
      time: "2022-12-01 00:00:00",
      count: 1,
    },
    {
      status: "SUCCESS",
      time: "2022-12-01 00:00:00",
      count: 1,
    },
    {
      status: "PENDING",
      time: "2022-12-01 00:00:00",
      count: 1,
    },
  ];

  it("should render correctly with data - daily: 0", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: response,
      });
    });
    renderWithProviders(
      <BarLineAnalytics
        title="test"
        subtitle="test_subtitle"
        type={0}
        noti_type={"SLACK"}
      />
    );
  });

  it("should render correctly with data - daily: 1", () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: response,
      });
    });
    renderWithProviders(
      <BarLineAnalytics
        title="test"
        subtitle="test_subtitle"
        type={1}
        noti_type={"SLACK"}
      />,
      {
        preloadedState: {
          project: {
            projects: [],
            selectedProject: {
              id: 1,
              name: "test",
              project_type: "INDIVIDUAL",
            },
          },
        },
      }
    );
  });

  it("should render correctly with data - daily: 2", () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: response,
      });
    });
    renderWithProviders(
      <BarLineAnalytics
        title="test"
        subtitle="test_subtitle"
        type={2}
        noti_type={"SLACK"}
      />
    );
  });

});
