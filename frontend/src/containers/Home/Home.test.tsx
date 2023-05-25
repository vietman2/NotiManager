import Home from "./Home";
import { renderWithProviders } from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";

import { BrowserRouter } from "react-router-dom";

jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));

describe("Home", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      { preloadedState }
    );
  });
});
