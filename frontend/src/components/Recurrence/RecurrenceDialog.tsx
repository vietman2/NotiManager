import {
  EndingConditionType,
  FrequencyType,
  Recurrence,
  RecurrenceType,
} from "./index";
import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import { RRule } from "rrule";
import { useState } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
  recurrence: RecurrenceType;
  handleRecurrenceChange: (recurrence: RecurrenceType) => void;
  setRrule: (rrule: RRule | null) => void;
}

const RecurrenceDialog = (props: IProps) => {
  const { open, onClose, recurrence, handleRecurrenceChange, setRrule } = props;

  const handleClickConfirm = () => {
    let frequency;
    switch (recurrence.frequency) {
      case FrequencyType.Annually:
        frequency = RRule.YEARLY;
        break;
      case FrequencyType.Monthly:
        frequency = RRule.MONTHLY;
        break;
      case FrequencyType.Weekly:
        frequency = RRule.WEEKLY;
        break;
      case FrequencyType.Daily:
        frequency = RRule.DAILY;
        break;
      case FrequencyType.Hourly:
        frequency = RRule.HOURLY;
        break;
      case FrequencyType.Minutely:
        frequency = RRule.MINUTELY;
        break;
    }
    let byweekday;
    if (frequency === RRule.WEEKLY) {
      byweekday = recurrence.weekDaysRepetition;
    }

    let interval = recurrence.numberOfRepetitions;

    let startDate = recurrence.startDate;
    let endDate = recurrence.endDate;
    if (recurrence.isAllDay) {
      if (recurrence.startTime) {
        startDate = recurrence.startTime;
      } else {
      }
      if (recurrence.endTime) {
        endDate = recurrence.endTime;
      }
    }

    let newRrule;
    switch (recurrence.endingCondition) {
      case EndingConditionType.None:
        newRrule = new RRule({
          freq: frequency,
          interval: interval,
          dtstart: startDate,
          byweekday: byweekday,
        });
        break;
      case EndingConditionType.EndDate:
        let endDate = recurrence.endDate;
        newRrule = new RRule({
          freq: frequency,
          interval: interval,
          dtstart: startDate,
          byweekday: byweekday,
          until: endDate,
        });
        break;
      case EndingConditionType.OccurrencesNumber:
        let count = recurrence.endingOccurrencesNumber;
        newRrule = new RRule({
          freq: frequency,
          interval: interval,
          dtstart: startDate,
          byweekday: byweekday,
          count: count,
        });
        break;
    }

    handleRecurrenceChange(recurrence);
    setRrule(newRrule);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Recurrence recurrence={recurrence} onChange={handleRecurrenceChange} />
      <Button data-testid={"create-button"} onClick={handleClickConfirm}>
        Confirm
      </Button>
    </Dialog>
  );
};

export default RecurrenceDialog;
