import { renderWithProviders } from "../../test-utils/mocks";
import { EnumNotificationType } from "../../Enums";
import MessageCreateForm from "./MessageForm";
import { fireEvent, screen } from "@testing-library/react";

describe("MessageCreateForm", () => {
  it("should render slack", () => {
    renderWithProviders(
      <MessageCreateForm
        name={"test"}
        setName={() => {}}
        notificationType={EnumNotificationType.SLACK}
        data={{
          channel: "test",
        }}
        setData={() => {}}
        fieldErrors={{}}
        setFieldErrors={() => {}}
      />
    );

    const name = screen.getByTestId("slack-name-input");
    fireEvent.change(name, { target: { value: "change" } });

    const channel = screen.getByTestId("slack-channel-input");
    fireEvent.change(channel, { target: { value: "change" } });

    const message = screen.getByTestId("slack-message-input");
    fireEvent.change(message, { target: { value: "change" } });
  });

  it("should render email", () => {
    renderWithProviders(
      <MessageCreateForm
        name={"test"}
        setName={() => {}}
        notificationType={EnumNotificationType.EMAIL}
        data={{}}
        setData={() => {}}
        fieldErrors={{}}
        setFieldErrors={() => {}}
      />
    );

    const name = screen.getByTestId("email-name-input");
    fireEvent.change(name, { target: { value: "change" } });

    const title = screen.getByTestId("email-title-input");
    fireEvent.change(title, { target: { value: "change" } });

    const message = screen.getByTestId("email-message-input");
    fireEvent.change(message, { target: { value: "change" } });
  });

  it("should render webhook", () => {
    renderWithProviders(
      <MessageCreateForm
        name={"test"}
        setName={() => {}}
        notificationType={EnumNotificationType.WEBHOOK}
        data={{}}
        setData={() => {}}
        fieldErrors={{}}
        setFieldErrors={() => {}}
      />
    );

    const name = screen.getByTestId("webhook-name-input");
    fireEvent.change(name, { target: { value: "change" } });

    const message = screen.getByTestId("webhook-message-input");
    fireEvent.change(message, { target: { value: "change" } });
  });

  it("should render SMS", () => {
    renderWithProviders(
      <MessageCreateForm
        name={"test"}
        setName={() => {}}
        notificationType={EnumNotificationType.SMS}
        data={{}}
        setData={() => {}}
        fieldErrors={{}}
        setFieldErrors={() => {}}
      />
    );

    const name = screen.getByTestId("sms-name-input");
    fireEvent.change(name, { target: { value: "change" } });

    const message = screen.getByTestId("sms-message-input");
    fireEvent.change(message, { target: { value: "change" } });
  });

  it("should render something else", () => {
    renderWithProviders(
      <MessageCreateForm
        name={"test"}
        setName={() => {}}
        notificationType={"something"}
        data={{}}
        setData={() => {}}
        fieldErrors={{}}
        setFieldErrors={() => {}}
      />
    );
  });
});
