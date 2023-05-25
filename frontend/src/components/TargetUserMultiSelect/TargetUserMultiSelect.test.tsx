import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";
import TargetUserMultiSelect from "./TargetUserMultiSelect";

describe("<TargetUserMultiSelect />", () => {
  it("should render", () => {
    renderWithProviders(
      <TargetUserMultiSelect
        selected={[]}
        setSelected={() => {}}
        targetUsers={[]}
      />
    );
  });

  it("should render with selected", () => {
    const setSelected = jest.fn();
    renderWithProviders(
      <TargetUserMultiSelect
        selected={[{ label: "test", value: 1 }]}
        setSelected={setSelected}
        targetUsers={[]}
      />
    );
  });

  it("should handle click", () => {
    const setSelected = jest.fn();
    renderWithProviders(
      <TargetUserMultiSelect
        selected={[{ label: "test", value: 1 }]}
        setSelected={setSelected}
        targetUsers={[]}
      />
    );

    fireEvent.click(screen.getAllByText("test")[0]);
  });
});
