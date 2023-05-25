import { Card, CardHeader, Box, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./Today.css";
import BarLineToday from "./BarLineToday";
import Iconify from "../../../components/Iconify/Iconify";
import { notificationSelect } from "../../../store/slices/notifications";
import { projectListSelector } from "../../../store/slices/project";
import { todaySelect } from "../../../store/slices/today";
import { fetchStat } from "../../../services/notifications";

export default function Today() {
  const notifications = useSelector(notificationSelect);
  const projects = useSelector(projectListSelector);
  const today = useSelector(todaySelect);
  const [stat, setStat]: any = useState({});

  const initStat = async () => {
    setStat(await fetchStat());
  };

  useEffect(() => {
    initStat();
  }, []);
  function getRate() {
    if (notifications.totalNumber === 0) {
      return "0%";
    } else {
      return `${Math.round(
        (today.successTotal /
          (today.successTotal + today.failureTotal)) *
          100
      )}%`;
    }
  }

  function getToday() {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return today.toLocaleDateString();
  }

  function getProjectWithMostRequests() {
    if (projects.length === 0) {
      return "No Projects yet";
    } else {
      if (notifications.totalNumber === 0) {
        return "No notifications yet";
      } else {
        if(stat.most_request_project === "undefined") {
          return "ERROR";
        }
        return stat.most_request_project;
      }
    }
  }

  function getMostUsedChannel() {
    if (notifications.totalNumber === 0) {
      return "No notifications yet";
    } else {
      return stat.most_used_channel;
    }
  }

  function getMostActiveTime() {
    if (notifications.totalNumber === 0) {
      return "No notifications yet";
    } else {
      const start = Number(today.mostActive.time);
      const end = start + 1;
      const format = `${start}h ~ ${end}h`;
      return format;
    }
  }

  function getMostRecentFailure() {
    if (notifications.totalNumber === 0) {
      return "No notifications yet";
    } else {
      //TODO
      return stat.most_recent_failure;
    }
  }

  return (
    <Grid container spacing={2} className="Today">
      <Grid item xs={12} sm={12} md={12} lg={5}>
        <Card>
          <CardHeader title="Requests Today" subheader="00:00 ~ 23:59 KST" />
          <Box dir="ltr">
            <BarLineToday />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <Card>
          <CardHeader title="Daily Statistics" />

          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="Date"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="clarity:date-line" />
                  </Box>
                  <Typography variant="h6">{getToday()}</Typography>
                  <Typography variant="body2">Date Today</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="Success"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="mdi:check" />
                  </Box>
                  <Typography variant="h6">{getRate()}</Typography>
                  <Typography variant="body2">Success Rate</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="BiggestProject"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="ic:sharp-vertical-align-top" />
                  </Box>
                  <Typography variant="h6">
                    {getProjectWithMostRequests()}
                  </Typography>
                  <Typography variant="body2">Most requests</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="MostUsed"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="mdi:bell-ring" />
                  </Box>
                  <Typography variant="h6">{getMostUsedChannel()}</Typography>
                  <Typography variant="body2">Most used channel</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="MostActive"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="ic:round-access-time" />
                  </Box>
                  <Typography variant="h6">{getMostActiveTime()}</Typography>
                  <Typography variant="body2">Most active time</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="MostRecent"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="ic:baseline-sms-failed" />
                  </Box>
                  <Typography variant="h6">{getMostRecentFailure()}</Typography>
                  <Typography variant="body2">Most recent failure</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
