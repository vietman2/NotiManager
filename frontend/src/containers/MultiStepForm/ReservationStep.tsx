import {useState} from "react";
import {MessageType, TargetUserIdNameDto} from "../../types";
import {EndingConditionType, FrequencyType, RecurrenceType,} from "../../components/Recurrence";
import MessageForm from "../../components/Message/MessageForm";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {targetSelect} from "../../store/slices/target";
import {RRule} from "rrule";
import DynamicTable from "../../components/Message/DynamicTable";
import {projectSelect} from "../../store/slices/project";
import {createNotificationConfig} from "../../services/notifications";
import {getTargetColumns, getTargetKeys,} from "../../components/Message/utils/dyanamicTableUtils";

interface IProps {
  notificationType: string;
  message: MessageType;
  targetUserIds: TargetUserIdNameDto[];
}

export default function ReservationStep(props: IProps) {
  const { notificationType, message, targetUserIds } = props;

  const projectState = useSelector(projectSelect);
  const projectId = projectState.selectedProject?.id;

  const targetState = useSelector(targetSelect);

  // runtime 에 데이터가 바뀜. mutable.
  const targetUsers = targetState.targets.filter((target) =>
    targetUserIds.map((targetUser) => targetUser.value).includes(target.id)
  );
  const columns = getTargetColumns(notificationType);
  const keys = getTargetKeys(notificationType);

  let targets;
  if (targetUsers.length > 0) {
    targets = DynamicTable({
      columns,
      keys,
      rows: targetUsers,
      handleOpenMenu: null,
    });
  } else {
    targets = (
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        value={"Target Not Selected"}
        rows={1}
        disabled
      />
    );
  }

  const today = new Date();
  const defaultRecurrence = {
    startDate: today,
    frequency: FrequencyType.Weekly,
    numberOfRepetitions: 1,
    weekDaysRepetition: [],
    endingCondition: EndingConditionType.None,
    endingOccurrencesNumber: 0,
    endDate: today,
    isAllDay: false,
    startTime: today,
    endTime: today,
  };
  const [rrule] = useState<RRule | null>(null);

  const [mode] = useState("IMMEDIATE");
  const handleConfirm = async () => {
    const config = {
      project: projectId as number,
      type: notificationType,
      rrule: rrule?.toString(),
      message: message.id,
      target_users: targetUsers.map((target) => target.id),
      mode: mode,
    };
    await createNotificationConfig(config);
  };
  const reservationWarning = () => {
    let text = "Reservations can be made as many as 100 at most.";

    return (
      <Typography color="error" variant="body2">
        {text}
        <br />
        <br />
      </Typography>
    );
  };

  const reservation = (
    <>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        inputProps={{ "data-testid": "sms-name-input" }}
        value={
            "Reservation Not Selected!!!!"
        }
        disabled={true}
        required
      />
      <br />
      <br />
      <br />
    </>
  );

  return (
    <>
      {/* info */}
      <h2>Notification Type</h2>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        inputProps={{ "data-testid": "message-input" }}
        value={notificationType}
        rows={1}
        disabled={true}
        required
      />
      <br />
      <br />
      <br />
      <h2>Message</h2>
      <br />
      <br />
      <br />
      <h2>TargetUser</h2>
      {targets}
      <br />
      <br />
      <br />
      <h2>Reservation</h2>
      {reservationWarning()}
      {reservation}
      <Grid>
        <Button
          data-testid="confirm-button"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Grid>
    </>
  );
}
