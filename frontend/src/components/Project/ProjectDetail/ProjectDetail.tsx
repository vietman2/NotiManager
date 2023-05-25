import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../../store";
import { fetchProject, projectSelect } from "../../../store/slices/project";
import CollapsibleTable from "./Table/CollapsibleTable";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import MultiStepFormDialog from "../../../containers/MultiStepFormDialog/MultiStepFormDialog";
import "./ProjectDetail.css";
import {
  fetchNotificationConfigs,
  notificationConfigSelect,
} from "../../../store/slices/notificationConfig";

export default function ProjectDetail() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // get projectId from url
  const { id } = useParams();
  const projectId = Number(id);

  // get notifications from backend
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProject(projectId));
    dispatch(fetchNotificationConfigs(projectId));
  }, [dispatch, projectId]);
  const notificationConfigList = useSelector(
    notificationConfigSelect
  ).notificationConfigs_project;
  const selectedProject = useSelector(projectSelect);

  // event handlers
  const handleCreateNotification = (event: React.MouseEvent) => {
    setOpen(true);
  };

  const handleBackButton = () => {
    navigate("/projects");
  };

  return (
    <>
      <MultiStepFormDialog open={open} onClose={() => setOpen(false)} />

      <Container maxWidth="xl" className="projectDetailList">
        <Grid container justifyContent="space-between">
          <Grid item>
            <h2>{selectedProject.selectedProject?.name}</h2>
          </Grid>
          <Grid item className="projectDetailButton">
            <Button
              data-testid="createNotificationButton"
              onClick={handleCreateNotification}
            >
              NEW RESERVATION
            </Button>
          </Grid>
        </Grid>
        <CollapsibleTable notificationConfigs={notificationConfigList} />
        <Button onClick={handleBackButton}>Back</Button>
      </Container>
    </>
  );
}
