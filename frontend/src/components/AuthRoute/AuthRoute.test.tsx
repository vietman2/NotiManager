import { screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { setToken } from "../../store/slices/auth";
import { renderWithProviders } from "../../test-utils/mocks";
import AuthRoute from "./AuthRoute";

export function Child() {
  return <div>child</div>;
}

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("<AuthRoute />", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Child />
              </AuthRoute>
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should render with token", async () => {
    setToken("token string");
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Child />
              </AuthRoute>
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should render with user", async () => {
    setToken("token string");
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Child />
              </AuthRoute>
            }
          ></Route>
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          auth: {
            user: {
              email: "test@test",
              username: "test",
            },
          },
        },
      }
    );
    expect(mockNavigate).not.toHaveBeenCalled();
    const childComponent = screen.getByText("child");
    expect(childComponent).toBeInTheDocument();
  });
});
