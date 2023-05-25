import { EmailForm } from "./Email";
import { renderWithProviders } from "../../test-utils/mocks";
import { screen } from "@testing-library/react";

describe("EmailForm", () => {
  let emailForm: JSX.Element;

  beforeEach(() => {
    jest.clearAllMocks();
    emailForm = <EmailForm />;
  });

  it("renders", () => {
    renderWithProviders(emailForm);
    expect(screen.getByTestId("email-name-input")).toBeInTheDocument();
  });
});
