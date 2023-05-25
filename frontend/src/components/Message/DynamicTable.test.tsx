import DynamicTable from "./DynamicTable";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/mocks";

describe("DynamicTable", () => {
  it("renders", () => {
    renderWithProviders(<DynamicTable 
      columns={["test"]}
      keys={["test"]}
      rows={["test"]}
      handleOpenMenu={jest.fn()}
      onClickRow={jest.fn()}
      parser={jest.fn()}
    />)
  });

  it("should handle page change", () => {
    renderWithProviders(<DynamicTable
      columns={["test"]}
      keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]}
      rows={[
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test10",
        "test11",
      ]}
      handleOpenMenu={jest.fn()}
      onClickRow={jest.fn()}
      parser={jest.fn()}
    />)

    fireEvent.click(screen.getByTitle("Go to next page"));
  });

  it("should handle rows per page", () => {
    renderWithProviders(
      <DynamicTable
        columns={["test"]}
        keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]}
        rows={[
          "test1",
          "test2",
          "test3",
          "test4",
          "test5",
          "test6",
          "test7",
          "test8",
          "test9",
          "test10",
          "test11",
        ]}
        handleOpenMenu={jest.fn()}
        onClickRow={jest.fn()}
        parser={jest.fn()}
      />
    );

    fireEvent.change(screen.getByTestId("table-pagination").childNodes[0].childNodes[2].childNodes[1], {
      target: { value: 5 },
    });
  });
});
