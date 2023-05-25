import { renderWithProviders } from "../../test-utils/mocks";
import { fireEvent, screen } from "@testing-library/react";
import NotificationTypeStep from "./NotificationTypeStep";

describe("NotificationTypeStep", () => {
  it("should render correct: EMAIL", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="EMAIL"
        setNotificationType={() => {}}
        error=""
        setError={() => {}}
      />
    );
  });

  it("should render correct: SMS", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="SMS"
        setNotificationType={() => {}}
        error=""
        setError={() => {}}
      />
    );
  });

  it("should render correct: SLACK", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="SLACK"
        setNotificationType={() => {}}
        error=""
        setError={() => {}}
      />
    );
  });

  it("should handle organization project type", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="EMAIL"
        setNotificationType={() => {}}
        error=""
        setError={() => {}}
      />,
      {
        preloadedState: {
          project: {
            projects: [
              {
                id: 1,
                name: "test",
                project_type: "ORGANIZATION",
                number_of_requests: 1,
                most_recently_sent_notification: "",
              },
            ],
            selectedProject: {
              id: 1,
              name: "test",
              project_type: "ORGANIZATION",
            },
          },
        },
      }
    );
  });

  it("should handle change", () => {
    const setNotificationType = jest.fn();
    renderWithProviders(
      <NotificationTypeStep
        notificationType="EMAIL"
        setNotificationType={setNotificationType}
        error=""
        setError={() => {}}
      />
    );
    fireEvent.change(screen.getByTestId("notification-type-select"), {
      target: { value: "SMS" },
    });
  });

  it("should render with error", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="EMAIL"
        setNotificationType={() => {}}
        error="error"
        setError={() => {}}
      />
    );
  });
});
