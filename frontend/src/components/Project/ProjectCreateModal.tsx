import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createProject,
  fetchProject,
  updateProject,
} from "../../services/project";
import { AppDispatch } from "../../store";
import { fetchProjects } from "../../store/slices/project";

interface IProps {
  open: any;
  handleClose?: any;
  projectid?: number | null;
}

export default function ProjectCreateModal(props: IProps) {
  const projectType = "INDIVIDUAL";
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const clearForm = () => {
    setProjectName("");
  };
  
  useEffect(() => {
    const initializeFields = async () => {
      const project = await fetchProject(props.projectid!);
      setProjectName(project.name);
    };
    if (props.projectid) {
      initializeFields();
    }
  }, [props.projectid]);

  const handleClickConfirm = async () => {
    if (projectName && projectType) {
      if (props.projectid) {
        await updateProject(props.projectid, projectName, projectType);
      } else {
        await createProject(projectName, projectType);
      }
      clearForm();
      props.handleClose();
      await dispatch(fetchProjects());
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          if (props.projectid) {
            clearForm();
          }
          props.handleClose();
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        fullWidth
      >
        <br/>
        <DialogTitle>New Project</DialogTitle>
          <br />
        <DialogContent>
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            inputProps={{
              "data-testid": "name-input",
            }}
            // label="project name"
            type="text"
            fullWidth
            variant="standard"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
            required
          />
          <br />
          <br />
          <br />
          <br/>
          <br/>
        </DialogContent>
        <DialogActions>
          <Button data-testid="confirm-button" onClick={handleClickConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
