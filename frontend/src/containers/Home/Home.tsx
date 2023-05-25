import "./Home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { Grid } from "@material-ui/core";
import { green, grey, red, indigo } from "@mui/material/colors";

import Widget from "./Boxes/Widget";
import Analytics from "./Boxes/Analytics";
import Today from "./Boxes/Today";
import { AppDispatch } from "../../store";
import { authSelector } from "../../store/slices/auth";
import { notificationSelect, getTotal } from "../../store/slices/notifications";
import { fetchProjects, projectListSelector } from "../../store/slices/project";
import { getData, todaySelect } from "../../store/slices/today";
import Scrollbar from "../../components/Scrollbar/Scrollbar";

import "./Home.css";

export default function Home() {
  const projects = useSelector(projectListSelector);
  const user = useSelector(authSelector);
  const today = useSelector(todaySelect);
  const notifications = useSelector(notificationSelect);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(getTotal());
    dispatch(getData());
  }, [user, dispatch]);

  return (
    <>
      <Scrollbar>
        <Container maxWidth="xl" className="Home_Title">
          <Grid container justifyContent="space-between">
            <Grid item>
              <h2>{"Overview"}</h2>
            </Grid>
          </Grid>

          <Grid container spacing={3} className="widgetContainer">
            <Grid item xs={12} sm={6} md={3}>
              <Widget
                icon="eos-icons:project"
                title="Projects"
                subtitle="Number of projects"
                value={projects.length}
                color_main={grey[500]}
                color_dark={grey[600]}
                color_light={grey[400]}
                color_darker={grey[900]}
                color_lighter={grey[200]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Widget
                icon="wpf:sent"
                title="Total"
                subtitle="Total notification requests"
                value={notifications.totalNumber}
                color_main={indigo[500]}
                color_dark={indigo[600]}
                color_light={indigo[400]}
                color_darker={indigo[900]}
                color_lighter={indigo[200]}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Widget
                icon="mdi:check"
                title="Success"
                subtitle="Successful notification requests today"
                value={today.successTotal}
                color_main={green[500]}
                color_dark={green[600]}
                color_light={green[400]}
                color_darker={green[900]}
                color_lighter={green[200]}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Widget
                icon="mdi:exclamation-thick"
                title="Failure"
                subtitle="Failed notification requests today"
                value={today.failureTotal}
                color_main={red[500]}
                color_dark={red[600]}
                color_light={red[400]}
                color_darker={red[900]}
                color_lighter={red[200]}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="widgetContainer">
            <Grid item xs={12} sm={12} md={12}>
              <Today />
            </Grid>
          </Grid>
          <h2>Analytics</h2>
          <Analytics />
        </Container>
      </Scrollbar>
    </>
  );
}
