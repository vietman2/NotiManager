import { renderWithProviders } from "../../test-utils/mocks";
import Scrollbar from "./Scrollbar";
import * as browserUtil from "../../utils/browser";

describe("Scrollbar", () => {
  it("should render correctly", () => {
    renderWithProviders(<Scrollbar />);
  });

  it("should render correctly - mobile", () => {
    jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue("Android");
    renderWithProviders(<Scrollbar />);
  });

  it("should render correctly - undefined", () => {
    jest.spyOn(browserUtil, "getNavigatorType").mockReturnValue("undefined");
    renderWithProviders(<Scrollbar />);
  });
});
