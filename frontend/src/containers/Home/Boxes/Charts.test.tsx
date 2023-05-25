import { renderWithProviders } from "../../../test-utils/mocks";
import Charts from "./Charts";
import { screen } from "@testing-library/react";
import { EnumNotificationStatus } from "../../../Enums";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("Charts", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <Charts selectedTab={0} selectedProject={0} selectedType={0} />
    );
  });

  it("should handle tabs correctly: 0", () => {
    renderWithProviders(
      <Charts selectedTab={0} selectedProject={0} selectedType={0} />
    );

    screen.getByText("Notification status");
  });

  it("should handle tabs correctly: 1", () => {
    renderWithProviders(
      <Charts selectedTab={1} selectedProject={0} selectedType={0} />
    );
  });

  it("should handle tabs correctly: 2", () => {
    renderWithProviders(
      <Charts selectedTab={2} selectedProject={0} selectedType={0} />
    );
  });
});
