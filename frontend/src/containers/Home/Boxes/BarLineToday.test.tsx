import { renderWithProviders } from "../../../test-utils/mocks";
import BarLineToday from "./BarLineToday";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("BarLineToday", () => {
    it("should render correctly", () => {
        renderWithProviders(<BarLineToday />);
    });
    }
);