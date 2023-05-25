import { Recurrence } from "./index";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { fireEvent, render, screen } from "@testing-library/react";
import { EndingConditionType, FrequencyType, RecurrenceType } from "./types";
import { contextInitValue } from "./components/RecurrenceContext";

const defaultRecurrence: RecurrenceType = {
  startDate: new Date(),
  frequency: FrequencyType.None,
  numberOfRepetitions: undefined,
  weekDaysRepetition: [],
  endingCondition: EndingConditionType.None,
  endDate: undefined,
  endingOccurrencesNumber: undefined,
  isAllDay: false,
  startTime: undefined,
  endTime: undefined,
};

const renderWithContext = (recurrence: RecurrenceType) => {
  return render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Recurrence recurrence={recurrence} onChange={() => {}} />
    </MuiPickersUtilsProvider>
  );
};

describe("StartDateSelector", () => {
  it("should handle start date change", () => {
    const { container } = renderWithContext(defaultRecurrence);
    expect(container).toBeInTheDocument();

    fireEvent.change(document.getElementsByName("start-date")[0], {
      target: { value: "2021-01-01" },
    });
  });
});

describe("FrequencySelector", () => {
  it("should render no recurrence", () => {
    renderWithContext({
      ...defaultRecurrence,
      frequency: FrequencyType.None,
    });
  });

  it("should render minutely recurrence", () => {
    renderWithContext({
      ...defaultRecurrence,
      frequency: FrequencyType.Minutely,
    });
  });

  it("Hourly recurrence should have number of repetitions visible", () => {
    const recurrence = {
      ...defaultRecurrence,
      frequency: FrequencyType.Hourly,
    };
    renderWithContext(recurrence);
    expect(screen.getByTestId("recurrence-number-of-repetitions")).toBeTruthy();
  });

  it("Hourly recurrence should have weekdays selector invisible", () => {
    const recurrence = {
      ...defaultRecurrence,
      frequency: FrequencyType.Hourly,
    };
    renderWithContext(recurrence);
    expect(screen.queryByTestId("recurrence-week-days-selector")).toBeFalsy();
  });

  it("Weekly recurrence should have weekdays selector visible", () => {
    const recurrence = {
      ...defaultRecurrence,
      frequency: FrequencyType.Weekly,
    };
    renderWithContext(recurrence);
    expect(screen.getByTestId("recurrence-week-days-selector")).toBeTruthy();
  });

  it("should render monthly recurrence", () => {
    const recurrence = {
      ...defaultRecurrence,
      frequency: FrequencyType.Monthly,
    };
    renderWithContext(recurrence);
  });

  it("should render annual recurrence", () => {
    const recurrence = {
      ...defaultRecurrence,
      frequency: FrequencyType.Annually,
    };
    renderWithContext(recurrence);
  });

  it("should handle frequency change", () => {
    const { container } = renderWithContext(defaultRecurrence);
    expect(container).toBeInTheDocument();
    const frequencySelector = screen
      .getByTestId("recurrence-frequency")
      .querySelector("input")!;

    fireEvent.change(frequencySelector, {
      target: { value: FrequencyType.Minutely },
    });
  });

  it("should handle number of repetitions change", () => {
    const recurrence = {
      ...defaultRecurrence,
      frequency: FrequencyType.Hourly,
    };
    const { container } = renderWithContext(recurrence);
    expect(container).toBeInTheDocument();
    const numberOfRepetitionsSelector = screen
      .getByTestId("recurrence-number-of-repetitions")
      .querySelector("input")!;

    fireEvent.change(numberOfRepetitionsSelector, { target: { value: 10 } });
  });

  it("should handle week days change", () => {
    const recurrence = {
      ...defaultRecurrence,
      frequency: FrequencyType.Weekly,
    };
    const { container } = renderWithContext(recurrence);
    expect(container).toBeInTheDocument();
    // FIXME
    const weekDaysSelector = screen.getByTestId("weekdays-0");
    fireEvent.click(weekDaysSelector);
    // fireEvent.click(weekDaysSelector) ;
  });
});

describe("EndingConditionSelector", () => {
  it("No ending condition should disable end date and occurrences number input", () => {
    const recurrence = {
      ...defaultRecurrence,
      endingCondition: EndingConditionType.None,
    };
    renderWithContext(recurrence);
    expect(
      screen.getByTestId("recurrence-ending-condition-end-date")
    ).toBeDisabled();
    expect(
      screen.getByTestId("recurrence-ending-condition-occurrences-number")
    ).toBeDisabled();
  });

  it("should handle week days change - unselect", () => {
    const recurrence = {
      ...defaultRecurrence,
      frequency: FrequencyType.Weekly,
    };
    const { container } = renderWithContext(recurrence);
    expect(container).toBeInTheDocument();
    // FIXME
    const weekDaysSelector = screen.getByTestId("weekdays-1");
    fireEvent.click(weekDaysSelector);
    fireEvent.click(weekDaysSelector);
  });

  it("End Date ending condition should enable end date and disable occurrences number input", () => {
    const recurrence = {
      ...defaultRecurrence,
      endingCondition: EndingConditionType.EndDate,
    };
    renderWithContext(recurrence);
    expect(
      screen.getByTestId("recurrence-ending-condition-end-date")
    ).toBeEnabled();
    expect(
      screen.getByTestId("recurrence-ending-condition-occurrences-number")
    ).toBeDisabled();
  });

  it("Number of occurrences ending condition should disable end date and enable occurrences number input", () => {
    const recurrence = {
      ...defaultRecurrence,
      endingCondition: EndingConditionType.OccurrencesNumber,
    };
    renderWithContext(recurrence);
    expect(
      screen.getByTestId("recurrence-ending-condition-end-date")
    ).toBeDisabled();
    expect(
      screen.getByTestId("recurrence-ending-condition-occurrences-number")
    ).toBeEnabled();
  });

  it("should handle ending condition change", () => {
    const { container } = renderWithContext(defaultRecurrence);
    expect(container).toBeInTheDocument();
    const endingConditionSelector = screen
      .getByTestId("recurrence-ending-condition-selector")
      .querySelector("input")!;
    fireEvent.change(endingConditionSelector, {
      target: { value: EndingConditionType.EndDate },
    });
    fireEvent.change(endingConditionSelector, {
      target: { value: EndingConditionType.OccurrencesNumber },
    });

    const endingConditionEndDate = screen.getByTestId(
      "recurrence-ending-condition-end-date"
    );
    fireEvent.click(endingConditionEndDate);
  });

  it("should handle ending occurrence number change", () => {
    const recurrence = {
      ...defaultRecurrence,
      endingCondition: EndingConditionType.OccurrencesNumber,
    };
    const { container } = renderWithContext(recurrence);
    expect(container).toBeInTheDocument();
    const endingConditionOccurencesNumber = screen.getByTestId(
      "recurrence-ending-condition-occurrences-number"
    );
    fireEvent.change(endingConditionOccurencesNumber, {
      target: { value: 10 },
    });
  });

  it("should handle ending occurrence number change2", () => {
    const recurrence = {
      ...defaultRecurrence,
      endingCondition: EndingConditionType.OccurrencesNumber,
    };
    const { container } = renderWithContext(recurrence);
    expect(container).toBeInTheDocument();
    const endingConditionOccurencesNumber = screen.getByTestId(
      "recurrence-ending-condition-end-date"
    );
    fireEvent.change(endingConditionOccurencesNumber, {
      target: { value: Date() },
    });
  });
});

describe("TimeSelector", () => {
  it("Start and End time should be disabled when all day is checked", () => {
    const recurrence = {
      ...defaultRecurrence,
      isAllDay: true,
    };
    renderWithContext(recurrence);
    expect(screen.getByTestId("recurrence-start-time")).toBeDisabled();
    expect(screen.getByTestId("recurrence-end-time")).toBeDisabled();
  });

  it("Start and End time should be enabled when all day is unchecked", () => {
    const recurrence = {
      ...defaultRecurrence,
      isAllDay: false,
    };
    renderWithContext(recurrence);
    expect(screen.getByTestId("recurrence-start-time")).toBeEnabled();
    expect(screen.getByTestId("recurrence-end-time")).toBeEnabled();
  });

  it("should handle all day change", () => {
    const recurrence = {
      ...defaultRecurrence,
      isAllDay: false,
    };
    renderWithContext(recurrence);
    fireEvent.click(screen.getByTestId("recurrence-all-day"));
  });

  it("should handle start time change", () => {
    const recurrence = {
      ...defaultRecurrence,
      isAllDay: false,
    };
    const { container } = renderWithContext(recurrence);
    expect(container).toBeInTheDocument();

    const keyBoardTimePicker = screen.getByTestId("recurrence-start-time");

    fireEvent.change(keyBoardTimePicker, { target: { value: "12:00" } });
  });

  it("should handle end time change", () => {
    const recurrence = {
      ...defaultRecurrence,
      isAllDay: false,
    };
    const { container } = renderWithContext(recurrence);
    expect(container).toBeInTheDocument();

    const keyBoardTimePicker = screen.getByTestId("recurrence-end-time");

    fireEvent.change(keyBoardTimePicker, { target: { value: "12:00" } });
  });
});

describe("RecurrenceContext", () => {
  it("should handle recurrence change", () => {
    contextInitValue.onFieldChange("frequency", FrequencyType.Weekly);
    contextInitValue.onFieldsChange({ frequency: FrequencyType.Weekly });
  });
});
