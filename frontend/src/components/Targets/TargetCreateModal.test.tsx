import { renderWithProviders } from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";
import TargetCreateModal from "./TargetCreateModal";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

describe("TargetCreateModal", () => {
  it("should render", () => {
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={() => {}} />
    );

    userEvent.keyboard("{esc}");
  });

  it("should render: edit mode", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(
      Promise.resolve({
        data: {
          name: "test target",
        },
      })
    );
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={() => {}} targetId={1} />,
      { preloadedState }
    );

    userEvent.keyboard("{esc}");
  });

  it("should select notification type", async () => {
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={() => {}} />
    );
    const select = screen.getByTestId("type-input");
    fireEvent.change(select, { target: { value: "EMAIL" } });
  });

  it("should handle click: confirm", async () => {
    jest.spyOn(axios, "patch").mockImplementation(() => Promise.resolve());
    const handleClick = jest.fn();
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={handleClick} targetId={1} />, { preloadedState }
    );
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
  });

  it("should handle click: with slack data", () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={handleClick} />
    );

    const select = screen.getByTestId("type-input");
    fireEvent.change(select, { target: { value: "SLACK" } });

    const targetNameInput = screen.getByTestId("target-input");
    fireEvent.change(targetNameInput, { target: { value: "test" } });

    const apiKeyInput = screen.getByTestId("api-token-input");
    fireEvent.change(apiKeyInput, { target: { value: "test" } });

    const confirmButton = screen.getByText("Confirm");
    confirmButton.click();
  });

  it("should handle click: with email data", () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={handleClick} />
    );

    const select = screen.getByTestId("type-input");
    fireEvent.change(select, { target: { value: "EMAIL" } });

    const targetNameInput = screen.getByTestId("target-input");
    fireEvent.change(targetNameInput, { target: { value: "test" } });

    const emailInput = screen.getByTestId("email-address-input");
    fireEvent.change(emailInput, { target: { value: "test" } });

    const confirmButton = screen.getByText("Confirm");
    confirmButton.click();
  });

  it("should handle click: with webhook data : no auth", () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={handleClick} />
    );

    const select = screen.getByTestId("type-input");
    fireEvent.change(select, { target: { value: "WEBHOOK" } });

    const targetNameInput = screen.getByTestId("target-input");
    fireEvent.change(targetNameInput, { target: { value: "test" } });

    const webhookInput = screen.getByTestId("url-input");
    fireEvent.change(webhookInput, { target: { value: "test" } });

    const authInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(authInput, { target: { value: "no_auth" } });

    const confirmButton = screen.getByText("Confirm");
    confirmButton.click();
  });

  it("should handle click: with sms data", () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={handleClick} />
    );

    const select = screen.getByTestId("type-input");
    fireEvent.change(select, { target: { value: "SMS" } });

    const targetNameInput = screen.getByTestId("target-input");
    fireEvent.change(targetNameInput, { target: { value: "test" } });

    const webhookInput = screen.getByTestId("phone-number-input");
    fireEvent.change(webhookInput, { target: { value: "test" } });

    const confirmButton = screen.getByText("Confirm");
    confirmButton.click();
  });

  it("should handle click: confirm (edit mode)", async () => {
    jest.spyOn(axios, "patch").mockResolvedValue(
      Promise.resolve({
        data: {
          name: "new name",
        },
      })
    );
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={() => {}} targetId={1} />,
      { preloadedState }
    );

    fireEvent.change(screen.getByTestId("target-input"), {
      target: { value: "new name" },
    });
    fireEvent.click(screen.getByTestId("create-button"));
  });
});
