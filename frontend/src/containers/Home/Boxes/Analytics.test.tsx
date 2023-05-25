import Analytics from "./Analytics";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils/mocks";
import preloadedState from "../../../test-utils/mock_state";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("Analytics", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <Analytics />
      </BrowserRouter>,
      { preloadedState }
    );
  });

  it("should handle tab: all", () => {
    renderWithProviders(
      <BrowserRouter>
        <Analytics />
      </BrowserRouter>,
      { preloadedState }
    );

    const tab = screen.getByText("All");
    fireEvent.click(tab);
  });

  it("should handle tab: projects", () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {},
      })
    });
    renderWithProviders(
      <BrowserRouter>
        <Analytics />
      </BrowserRouter>,
      { preloadedState }
    );

    const tab = screen.getByText("By Project");
    fireEvent.click(tab);

    const tab2 = screen.getByText("test");
    fireEvent.click(tab2);

    const tab3 = screen.getByText("test2");
    fireEvent.click(tab3);
  });

  it("should handle tab: type", () => {
    renderWithProviders(
      <BrowserRouter>
        <Analytics />
      </BrowserRouter>,
      { preloadedState }
    );

    const tab = screen.getByText("By Type");
    fireEvent.click(tab);

    const tab2 = screen.getByText("SLACK");
    fireEvent.click(tab2);

    const tab3 = screen.getByText("Email");
    fireEvent.click(tab3);

    const tab4 = screen.getByText("SMS");
    fireEvent.click(tab4);

    const tab5 = screen.getByText("WEBHOOK");
    fireEvent.click(tab5);
  });
  
});
