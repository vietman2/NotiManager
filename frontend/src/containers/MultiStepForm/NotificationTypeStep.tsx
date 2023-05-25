import { MenuItem, Select } from "@mui/material";
import { EnumNotificationType } from "../../Enums";
import { Typography } from "@mui/material";

interface IProps {
  notificationType: string;
  setNotificationType: (notificationType: string) => void;
  error: string | null;
  setError: (error: string) => void;
}

export default function NotificationTypeForm(props: IProps) {
  return (
    <>
      <Select
        sx={{ mt: 2 }}
        fullWidth={true}
        value={props.notificationType}
        onChange={(event) => {
          props.setNotificationType(event.target.value as string);
          props.setError("");
        }}
        inputProps={{ "data-testid": "notification-type-select" }}
      >
        <MenuItem value={EnumNotificationType.WEBHOOK}>WEBHOOK</MenuItem>
        <MenuItem value={EnumNotificationType.EMAIL}>EMAIL</MenuItem>
        <MenuItem value={EnumNotificationType.SMS}>SMS</MenuItem>
        <MenuItem value={EnumNotificationType.SLACK}>SLACK</MenuItem>
      </Select>
      {props.error && (
        <Typography color="error" variant="body2">
          {props.error}
        </Typography>
      )}
    </>
  );
}
