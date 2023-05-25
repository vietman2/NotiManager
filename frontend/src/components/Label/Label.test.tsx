import { render } from "@testing-library/react";
import Label from "./Label";
import { MockTheme } from "../../test-utils/mocks";

describe("Label", () => {
  it("should render", () => {
    render(<Label />);
  });

  it("should render - start icon", () => {
    render(<Label startIcon={true} />);
  });

  it("should render - end icon", () => {
    render(<Label endIcon={true} />);
  });

  it("should render - filled variant", () => {
    render(<Label variant={"filled"} />);
  });

  it("should render - outlined variant", () => {
    render(<Label variant={"outlined"} />);
  });

  it("should render - soft variant", () => {
    render(<Label variant={"soft"} />);
  });

  it("should render - ghost variant", () => {
    render(
      <MockTheme>
        <Label variant={"soft"} />
      </MockTheme>
    );
  });
});
