import SignIn from "./SignIn";

import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/mocks";
import axios from "axios";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    Navigate: (props: any) => {
      mockNavigate(props.to);
      return null;
    },

    useNavigate: () => mockNavigate,
  };
});

describe("<SignIn />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    renderWithProviders(<SignIn />);
  });

  it("should navigate to signup page", () => {
    renderWithProviders(<SignIn />);

    fireEvent.click(screen.getByTestId("signup-button"));

    expect(mockNavigate).toBeCalledWith("/signup");
  });

  it("should show error message when submitted with empty inputs", async () => {
    renderWithProviders(<SignIn />);
    fireEvent.click(screen.getByTestId("signin-button"));

    const error = screen.findByTestId("error-message");

    expect((await error).textContent).toBe("Please fill in all fields");
  });

  it("should show error message when submitted with invalid inputs", async () => {
    renderWithProviders(<SignIn />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    fireEvent.click(screen.getByTestId("signin-button"));

    const error = screen.findByTestId("error-message");

    expect((await error).textContent).toBe("Invalid email");
  });

  it("should show error message when submitted with invalid credentials", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({
      response: {
        status: 401,
      },
    });

    renderWithProviders(<SignIn />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    fireEvent.click(screen.getByTestId("signin-button"));
    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });

  it("should show error message when server is down", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({
      status: 500,
    });

    renderWithProviders(<SignIn />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    fireEvent.click(screen.getByTestId("signin-button"));
    await waitFor(() => {
      expect(screen.getByText("Error connecting to server")).toBeInTheDocument();
    });
  });

  it("should successfully login", async () => {
    jest.spyOn(axios, "post").mockImplementation(() => {
      return Promise.resolve({
        data: {
          token: "test",
        },
        status: 200,
      });
    });

    renderWithProviders(<SignIn />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    fireEvent.click(screen.getByTestId("signin-button"));
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith("/home");
    });
  });
});
