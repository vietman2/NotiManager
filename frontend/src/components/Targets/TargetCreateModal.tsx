import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { TargetUserForm } from "./TargetUserForm";
import { AppDispatch } from "../../store";
import { createTarget, fetchTargets } from "../../store/slices/target";
import { EnumNotificationType } from "../../Enums";
import { getTarget, updateTarget } from "../../services/target";

interface IProps {
  open: any;
  handleClose: any;
  targetId?: number | null;
}

export default function TargetCreateModal(props: IProps) {
  const [targetName, setTargetName] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [data, setData] = useState({});

  const dispatch = useDispatch<AppDispatch>();

  const initializeFields = useCallback(async () => {
    const target = await getTarget(props.targetId!);
    if (target) {
      setEndpoint(target.endpoint);
      setData(target.data);
      setNotificationType(target.notification_type);
      setTargetName(target.name);
    }
  }, [props.targetId]);

  useEffect(() => {
    if (props.targetId) {
      initializeFields();
    }
  }, [props.targetId, initializeFields]);

  const clearForm = () => {
    setTargetName("");
    setNotificationType("");
    setEndpoint("");
    setData({});
  };

  const handleClickConfirm = async () => {
    if (
      (targetName && notificationType && endpoint) || // NON SLACK
      (notificationType === EnumNotificationType.SLACK.toString() &&
        targetName &&
        "api_key" in data) // SLACK
    ) {
      // validation check
      switch (notificationType) {
        case EnumNotificationType.WEBHOOK.toString():
          try {
            new URL(endpoint);
          } catch (TypeError) {
            console.log("Invalid URL");
            return;
          }
          break;
        case EnumNotificationType.EMAIL.toString():
          // TODO
          break;
        case EnumNotificationType.SMS.toString():
          // TODO
          break;
      }
      if (props.targetId) {
        const requestData = {
          name: targetName,
          endpoint: endpoint,
          data: data,
        };
        await updateTarget(props.targetId, requestData);
      } else {
        const requestData = {
          name: targetName,
          notification_type: notificationType,
          endpoint: endpoint,
          data: data,
        };
        dispatch(createTarget(requestData));
      }
      clearForm();
      props.handleClose();
      dispatch(fetchTargets());
    }
  };

  let form = TargetUserForm({
    notificationType,
    targetName,
    setTargetName,
    endpoint,
    setEndpoint,
    data,
    setData,
  });

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          if (props.targetId) {
            clearForm();
          }
          props.handleClose();
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        fullWidth
      >
        <DialogTitle>
          {props.targetId ? "Update Target" : "New Target"}
        </DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label">
            Notification Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={notificationType}
            inputProps={{
              "data-testid": "type-input",
            }}
            onChange={(event: SelectChangeEvent) => {
              setNotificationType(event.target.value);
              setData({});
            }}
            fullWidth
            disabled={Boolean(props.targetId)}
          >
            <MenuItem value={EnumNotificationType.SLACK}>SLACK</MenuItem>
            <MenuItem value={EnumNotificationType.EMAIL}>EMAIL</MenuItem>
            <MenuItem value={EnumNotificationType.WEBHOOK}>WEBHOOK</MenuItem>
            <MenuItem value={EnumNotificationType.SMS}>SMS</MenuItem>
          </Select>
          <br />
          <br />
          {form}
        </DialogContent>
        <DialogActions>
          <Button data-testid={"create-button"} onClick={handleClickConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TargetCreateModal.defaultProps = {
  update: false,
};
