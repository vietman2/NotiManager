import { FormWrapper } from "./FormWrapper";
import {
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, messageSelect } from "../../store/slices/message";
import { AppDispatch } from "../../store";
import MessageCreateForm from "../../components/Message/MessageForm";
import { MessageType } from "../../types";
import DynamicTable from "../../components/Message/DynamicTable";
import { messageCreateService } from "../../components/Message/utils/MessageRequestService";
import {
  getMessageColumns,
  getMessageKeys,
} from "../../components/Message/utils/dyanamicTableUtils";

interface IProps {
  notificationType: string;

  name: any;
  setName: (name: any) => void;

  data: any;
  setData: (content: any) => void;

  fieldErrors: any;
  setFieldErrors: (error: any) => void;

  message: MessageType | null;
  setMessage: (message: any) => void;
}

export default function MessageStep(props: IProps) {
  const {
    notificationType,
    name,
    setName,
    data,
    setData,
    fieldErrors,
    setFieldErrors,
    message,
    setMessage,
  } = props;

  // ui
  const [mode, setMode] = useState("load"); // import , create
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const messageState = useSelector(messageSelect);
  const messages = messageState.messages;

  // handler
  const handleLoadButton = () => {
    setDialogOpen(true);
  };

  const handleClickConfirm = async () => {
    if (notificationType) {
      const errorField = await messageCreateService(
        notificationType,
        name,
        data,
        fieldErrors
      );
      if (errorField) {
        setFieldErrors(errorField);
      }
      dispatch(fetchMessages());
    }
  };

  const form = MessageCreateForm(props, mode !== "create");

  return (
    <FormWrapper>
      <FormControl>
        <RadioGroup
          aria-label="notificationType"
          onChange={(e) => {
            if (e.target.value === "load" && message) {
              setName(message?.name);
              setData(message?.data);
            }
            setMode(e.target.value);
          }}
          data-testid={"mode-radio-group"}
          defaultValue="load"
          name="radio-buttons-group"
        >
          <FormControlLabel value={"load"} control={<Radio />} label={"Load"} />
          <FormControlLabel
            value={"create"}
            control={<Radio />}
            label={"Create"}
          />
        </RadioGroup>
      </FormControl>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth={true}
      >
        <Grid
          container
          style={{ minHeight: "87vh" }}
          alignItems="top"
          justifyContent="top"
          marginTop={4}
        >
          <Grid item lg></Grid>
          <Grid item lg={10}>
            <DynamicTable
              columns={getMessageColumns(notificationType)} // todo: refactor
              keys={getMessageKeys(notificationType)}
              rows={messages[notificationType]}
              handleOpenMenu={null}
              onClickRow={(id: number) => {
                const message = messages[notificationType].find(
                  (message: any) => message.id === id
                );
                setName(message?.name);
                setData(message?.data);
                setMessage(message);
                setDialogOpen(false);
              }}
            />
          </Grid>

          <Grid item lg></Grid>
        </Grid>
        <Button onClick={() => setDialogOpen(false)}>Close</Button>
      </Dialog>
      <Button
        data-testid="loadMessageButton"
        variant="contained"
        onClick={handleLoadButton}
      >
        Load
      </Button>
      {form}
      {mode === "create" ? (
        <Button data-testid="confirm-button" onClick={handleClickConfirm}>
          Create Message
        </Button>
      ) : null}
    </FormWrapper>
  );
}
