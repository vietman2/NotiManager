import MessageCreateModal from "./MessageCreateModal";
import { renderWithProviders } from "../../test-utils/mocks";
import { fireEvent, screen } from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";
import { EnumNotificationType } from "../../Enums";
import axios from "axios";
import userEvent from "@testing-library/user-event";

describe("MessageCreateModal", () => {
  it("should render", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {}
      });
    });
    renderWithProviders(
      <MessageCreateModal open={true} handleClose={() => {}} messageId={1} />
    );

    userEvent.keyboard("{esc}");
  });

  it("should handle create button correctly", () => {
    jest.spyOn(axios, "post").mockResolvedValue(
      Promise.resolve({
        data: {},
      })
    );

    renderWithProviders(
      <MessageCreateModal open={true} handleClose={() => {}} />,
      { preloadedState }
    );

    const dataInput = screen.getByTestId("type-input");
    fireEvent.change(dataInput, {
      target: { value: EnumNotificationType.SLACK },
    });
    const button = screen.getByTestId("create-button");
    fireEvent.click(button);

    const slackNameInput = screen.getByTestId("slack-name-input");
    fireEvent.change(slackNameInput, {
      target: { value: "name" },
    });

    const slackChannelInput = screen.getByTestId("slack-channel-input");
    fireEvent.change(slackChannelInput, {
      target: { value: "channel" },
    });

    const slackMessageInput = screen.getByTestId("slack-message-input");
    fireEvent.change(slackMessageInput, {
      target: { value: "message" },
    });

    fireEvent.click(button);

    fireEvent.change(dataInput, {
      target: { value: EnumNotificationType.WEBHOOK },
    });

    fireEvent.change(dataInput, {
      target: { value: EnumNotificationType.EMAIL },
    });

    fireEvent.change(dataInput, {
      target: { value: EnumNotificationType.SMS },
    });
  });

  it("should handle create button correctly - error", () => {
    renderWithProviders(
      <MessageCreateModal open={true} handleClose={() => {}} />,
      { preloadedState }
    );

    const dataInput = screen.getByTestId("type-input");
    fireEvent.change(dataInput, {
      target: { value: EnumNotificationType.SLACK },
    });
    const button = screen.getByTestId("create-button");
    fireEvent.click(button);

    const slackNameInput = screen.getByTestId("slack-name-input");
    fireEvent.change(slackNameInput, {
      target: { value: "name" },
    });

    const slackMessageInput = screen.getByTestId("slack-message-input");
    fireEvent.change(slackMessageInput, {
      target: { value: "message" },
    });

    fireEvent.click(button);

    fireEvent.change(dataInput, {
      target: { value: EnumNotificationType.WEBHOOK },
    });

    fireEvent.change(dataInput, {
      target: { value: EnumNotificationType.EMAIL },
    });

    fireEvent.change(dataInput, {
      target: { value: EnumNotificationType.SMS },
    });
  });

  it("should handle create button correctly - disable button", () => {
    renderWithProviders(
      <MessageCreateModal open={true} handleClose={() => {}} />,
      { preloadedState }
    );

    const button = screen.getByTestId("create-button");
    fireEvent.click(button);
  });


});
