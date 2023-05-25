import RecurrenceDialog from "./RecurrenceDialog";
import { renderWithProviders } from "../../test-utils/mocks";
import { FrequencyType, EndingConditionType } from "./types";
import { fireEvent, screen } from "@testing-library/react";

describe("RecurrenceDialog", () => {
  it("should render", () => {
    renderWithProviders(
      <RecurrenceDialog
        open={true}
        onClose={() => {}}
        recurrence={{
          frequency: FrequencyType.None,
          endingCondition: EndingConditionType.None,
          numberOfRepetitions: 1,
          weekDaysRepetition: [],
          isAllDay: false,
          startDate: new Date(),
          endDate: new Date(),
          endingOccurrencesNumber: 1,
          startTime: new Date(),
          endTime: new Date(),
        }}
        handleRecurrenceChange={() => {}}
        setRrule={() => {}}
      />
    );
  });

  it("should handle click confirm: annually", () => {
    renderWithProviders(
      <RecurrenceDialog
        open={true}
        onClose={() => {}}
        recurrence={{
          frequency: FrequencyType.Annually,
          endingCondition: EndingConditionType.EndDate,
          numberOfRepetitions: 1,
          weekDaysRepetition: [],
          isAllDay: true,
          startDate: new Date(),
          endDate: new Date(),
          endingOccurrencesNumber: 1,
          startTime: new Date(),
          endTime: new Date(),
        }}
        handleRecurrenceChange={() => {}}
        setRrule={() => {}}
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
  });

  it("should handle click confirm: monthly", () => {
    renderWithProviders(
      <RecurrenceDialog
        open={true}
        onClose={() => {}}
        recurrence={{
          frequency: FrequencyType.Monthly,
          endingCondition: EndingConditionType.OccurrencesNumber,
          numberOfRepetitions: 1,
          weekDaysRepetition: [],
          isAllDay: false,
          startDate: new Date(),
          endDate: new Date(),
          endingOccurrencesNumber: 1,
          startTime: new Date(),
          endTime: new Date(),
        }}
        handleRecurrenceChange={() => {}}
        setRrule={() => {}}
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
  });

  it("should handle click confirm: weekly", () => {
    renderWithProviders(
      <RecurrenceDialog
        open={true}
        onClose={() => {}}
        recurrence={{
          frequency: FrequencyType.Weekly,
          endingCondition: EndingConditionType.None,
          numberOfRepetitions: 1,
          weekDaysRepetition: [],
          isAllDay: false,
          startDate: new Date(),
          endDate: new Date(),
          endingOccurrencesNumber: 1,
          startTime: new Date(),
          endTime: new Date(),
        }}
        handleRecurrenceChange={() => {}}
        setRrule={() => {}}
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
  });

  it("should handle click confirm: daily", () => {
    renderWithProviders(
      <RecurrenceDialog
        open={true}
        onClose={() => {}}
        recurrence={{
          frequency: FrequencyType.Daily,
          endingCondition: EndingConditionType.None,
          numberOfRepetitions: 1,
          weekDaysRepetition: [],
          isAllDay: false,
          startDate: new Date(),
          endDate: new Date(),
          endingOccurrencesNumber: 1,
          startTime: new Date(),
          endTime: new Date(),
        }}
        handleRecurrenceChange={() => {}}
        setRrule={() => {}}
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
  });

  it("should handle click confirm: hourly", () => {
    renderWithProviders(
      <RecurrenceDialog
        open={true}
        onClose={() => {}}
        recurrence={{
          frequency: FrequencyType.Hourly,
          endingCondition: EndingConditionType.None,
          numberOfRepetitions: 1,
          weekDaysRepetition: [],
          isAllDay: false,
          startDate: new Date(),
          endDate: new Date(),
          endingOccurrencesNumber: 1,
          startTime: new Date(),
          endTime: new Date(),
        }}
        handleRecurrenceChange={() => {}}
        setRrule={() => {}}
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
  });

  it("should handle click confirm: minutely", () => {
    renderWithProviders(
      <RecurrenceDialog
        open={true}
        onClose={() => {}}
        recurrence={{
          frequency: FrequencyType.Minutely,
          endingCondition: EndingConditionType.None,
          numberOfRepetitions: 1,
          weekDaysRepetition: [],
          isAllDay: false,
          startDate: new Date(),
          endDate: new Date(),
          endingOccurrencesNumber: 1,
          startTime: new Date(),
          endTime: new Date(),
        }}
        handleRecurrenceChange={() => {}}
        setRrule={() => {}}
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
  });
});
