import { renderWithProviders } from "../../test-utils/mocks";
import DynamicTable from "./DynamicTable";
import { fireEvent, screen } from "@testing-library/react";

describe("MessageTable", () => {
  it("should render", () => {
    renderWithProviders(
      <DynamicTable
        columns={["col1"]}
        rows={[{ data: { col1: "" } }]}
        keys={["col1"]}
        handleOpenMenu={() => {}}
      />
    );
  });

  it("should handle click row", () => {
    renderWithProviders(
      <DynamicTable
        columns={["col1"]}
        rows={[{ data: { col1: "" } }]}
        keys={["col1"]}
        handleOpenMenu={() => {}}
        onClickRow={() => {}}
      />
    );

    fireEvent.click(screen.getByText("col1"));
  });
});
