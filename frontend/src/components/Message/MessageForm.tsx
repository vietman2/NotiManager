import { EnumNotificationType } from "../../Enums";
import { InputLabel, TextField } from "@mui/material";

interface IProps {
  notificationType: string;
  name: string;
  setName: (name: string) => void;
  data: any;
  setData: (content: any) => void;
  fieldErrors: any;
  setFieldErrors: (error: any) => void;
}

export default function MessageCreateForm(
  props: IProps,
) {
  let form;
  const {
    name,
    setName,
    notificationType,
    data,
    setData,
    fieldErrors,
    setFieldErrors,
  } = props;
  let disabled = false;

  switch (notificationType) {
    case EnumNotificationType.SLACK:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            // TODO 원래 testid가 message-input인데 testid가 겹쳐서 바꿈. test 코드에 반영 필요
            inputProps={{ "data-testid": "slack-name-input" }}
            value={name}
            rows={1}
            disabled={disabled}
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Channel</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "slack-channel-input" }}
            onChange={(event: any) => {
              setData({ ...data, channel: event.target.value });
              setFieldErrors({ ...fieldErrors, channel: undefined });
            }}
            value={"channel" in data ? data.channel : ""}
            helperText={fieldErrors?.channel}
            error={Boolean(fieldErrors?.channel)}
            rows={1}
            disabled={disabled}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "slack-message-input" }}
            onChange={(event: any) => {
              setData({ ...data, message: event.target.value });
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in data ? data.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={4}
            disabled={disabled}
            required
          />
        </>
      );
      break;
    case EnumNotificationType.EMAIL:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-name-input" }}
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            rows={1}
            disabled={disabled}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Title</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-title-input" }}
            onChange={(event: any) => {
              setData({ ...data, title: event.target.value });
              setFieldErrors({ ...fieldErrors, title: undefined });
            }}
            value={"title" in data ? data.title : ""}
            helperText={fieldErrors?.title}
            error={Boolean(fieldErrors?.title)}
            rows={1}
            disabled={disabled}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-message-input" }}
            onChange={(event: any) => {
              setData({ ...data, message: event.target.value });
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in data ? data.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={8}
            disabled={disabled}
            required
          />
        </>
      );
      break;
    case EnumNotificationType.WEBHOOK:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "webhook-name-input" }}
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            rows={1}
            disabled={disabled}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            JSON Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "webhook-message-input" }}
            onChange={(event: any) => {
              setData({ ...data, message: event.target.value });
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in data ? data.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={9}
            required
            disabled={disabled}
          />
        </>
      );
      break;
    case EnumNotificationType.SMS:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "sms-name-input" }}
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            rows={1}
            disabled={disabled}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "sms-message-input" }}
            onChange={(event: any) => {
              setData({ ...data, message: event.target.value });
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in data ? data.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={9}
            disabled={disabled}
            required
          />
        </>
      );
      break;
    default:
      form = <></>;
      break;
      
  }

  return form;
}
