import { renderWithProviders } from "../../test-utils/mocks";
import SignUp from "./SignUp";
import { fireEvent, screen, waitFor } from "@testing-library/react";
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

describe("SignUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    renderWithProviders(<SignUp />);
  });

  it("should handle signup success", () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        data: {
          email: "test@test.com",
          username: "username",
          password: "password",
        },
        status: 201,
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
    );
    jest.spyOn(window, "alert").mockImplementation(() => {});

    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    fireEvent.click(screen.getByTestId("signup-button"));
  });

  it("should handle signup failure: invalid email", async () => {
    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");

    fireEvent.change(emailInput, { target: { value: "test@test" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    fireEvent.click(screen.getByTestId("signup-button"));
    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("should handle signup failure: email already exists", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({
      response: {
        status: 400,
      },
    });

    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    fireEvent.click(screen.getByTestId("signup-button"));
    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });

  it("should handle signup failure: server error", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({
      status: 500,
    });

    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    fireEvent.click(screen.getByTestId("signup-button"));
    await waitFor(() => {
      expect(
        screen.getByText("Error connecting to server")
      ).toBeInTheDocument();
    });
  });

  it("should handle signup failure: password mismatch", () => {
    renderWithProviders(<SignUp />);

    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "pass" } });

    fireEvent.click(screen.getByTestId("signup-button"));
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();

  });

  it("should handle signup failure: missing fields", () => {
    renderWithProviders(<SignUp />);

    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(screen.getByTestId("signup-button"));
    expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
  });

  it("should handle cancel button", () => {
    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const cancelButton = screen.getByTestId("cancel-button");

    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });
    fireEvent.click(cancelButton);
  });
});
