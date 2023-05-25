import { EnumNotificationType } from "../../Enums";
import { renderWithProviders } from "../../test-utils/mocks";
import { TargetUserForm } from "./TargetUserForm";
import { fireEvent, screen } from "@testing-library/react";

describe("TargetCreateForm", () => {
  it("should render email", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.EMAIL}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
  });

  it("should render slack", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.SLACK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
  });

  it("should render slack with value", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.SLACK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{api_key: "api_key"}}
        setData={() => {}}
      />
    );
  });

  it("should render webhook", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
  });

  it("should render sms", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.SMS}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
  });

  it("should handle change: slack api-key", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.SLACK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiKeyInput = screen.getByTestId("api-token-input");
    fireEvent.change(apiKeyInput, { target: { value: "test" } });
  });

  it("should handle change: webhook api auth", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "somethingelse" } });
  });

  it("should handle apiAuth: basic", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "basic" } });
  });

  it("should handle apiAuth: basic, data change", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "basic" } });

    const usernameInput = screen.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "newNAme" } });

    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "test" } });
  });

  it("should handle apiAuth: basic, data change - with value", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{username: "username", password:"password"}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "basic" } });
  });

  it("should handle apiAuth: bearer", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "bearer" } });
  });

  it("should handle apiAuth: bearer", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{token: "token"}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "bearer" } });
  });

  it("should handle apiAuth: bearer, data change", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "bearer" } });

    const tokenInput = screen.getByTestId("token-input");
    fireEvent.change(tokenInput, { target: { value: "test" } });
  });

  it("should handle apiAuth: api_key", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "api_key" } });
  });

    it("should handle apiAuth: api_key with key", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{key:"key", value: "value"}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "api_key" } });
  });

  it("should handle apiAuth: api_key, data change", async () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );

    const apiAuthInput = screen.getByTestId("type-input-webhook");
    fireEvent.change(apiAuthInput, { target: { value: "api_key" } });

    const tokenInput = screen.getByTestId("key-input");
    fireEvent.change(tokenInput, { target: { value: "test" } });

    const keyNameInput = screen.getByTestId("value-input");
    fireEvent.change(keyNameInput, { target: { value: "test" } });
  });

  it("should handle targetName change", () => {
    renderWithProviders(
      <TargetUserForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const targetNameInput = screen.getByTestId("target-input");
    fireEvent.change(targetNameInput, { target: { value: "somethingelse" } });
  });
});
