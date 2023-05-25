import OAuth from "./OAuth";
import {renderWithProviders} from "../test-utils/mocks";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate,
}));


describe("OAuth", () => {
  it("should render", () => {
    renderWithProviders(<OAuth/>)
  });
});
