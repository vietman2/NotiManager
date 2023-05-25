import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { green, red, blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import moment from "moment";

import BarLineChart from "./BarLineAnalytics";
import PieChart from "./PieChart";
import { projectSelect } from "../../../store/slices/project";
import {
  analyticsSelector,
  getMonthlyData,
  getMonthlyDataByProject,
  getMonthlyDataByType,
} from "../../../store/slices/analytics";
import { AppDispatch } from "../../../store";

interface IProps {
  selectedTab: number;
  selectedProject: number;
  selectedType: number;
}

const types = ["WEBHOOK", "Email", "SMS", "SLACK"];

export default function Charts(props: IProps) {
  const projectState = useSelector(projectSelect).selectedProject;
  const analyticsData = useSelector(analyticsSelector);

  const [Success, setSuccess] = useState(0);
  const [Failure, setFailure] = useState(0);
  const [Upcoming, setUpcoming] = useState(0);
  const [Total, setTotal] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleTabChange = async () => {
      //일단 getMonthly로 함
      if (props.selectedTab === 0) {
        await dispatch(getMonthlyData());
      } else if (props.selectedTab === 1) {
        if (projectState) {
          await dispatch(getMonthlyDataByProject(projectState.id));
        }
      } else {
        await dispatch(getMonthlyDataByType(types[props.selectedType]));
      }
    };
    handleTabChange();
  }, [dispatch, projectState, props.selectedTab, props.selectedType]);
  useEffect(() => {
    function getData() {
      let success = 0;
      let failure = 0;
      let upcoming = 0;
      let total = 0;

      for (let i = 12; i >= 0; i--) {
        const date = moment().subtract(i, "months").format("YYYY-MM-01");
        success += analyticsData.barLineDataMonthly.Success[date];
        failure += analyticsData.barLineDataMonthly.Failure[date];
        upcoming += analyticsData.barLineDataMonthly.Pending[date];
        total += analyticsData.barLineDataMonthly.Total[date];
      }

      setSuccess(success);
      setFailure(failure);
      setUpcoming(upcoming);
      setTotal(total);
    }
    getData();
  }, [analyticsData]);

  function getTitle() {
    if (props.selectedTab === 0) {
      return "Notification status";
    } else if (props.selectedTab === 1) {
      return "Notification status (" + projectState?.name + ")";
    } else {
      return "Notification status (" + types[props.selectedType] + ")";
    }
  }

  function getSubheader() {
    if (props.selectedTab === 0) {
      return "Total notification requests: " + shortenNumber(Total);
    } else if (props.selectedTab === 1) {
      return "Total notification requests: " + shortenNumber(Total);
    } else {
      return "Total notification requests: " + shortenNumber(Total);
    }
  }

  function shortenNumber(value: number) {
    if (value > 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value > 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value;
    }
  }

  function getSubtitle() {
    if (props.selectedTab === 0) {
      return "Notification requests by time";
    } else if (props.selectedTab === 1) {
      return projectState?.name + " notification requests by time";
    } else {
      return types[props.selectedType] + " notification requests by time";
    }
  }

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={5}>
        <BarLineChart
          title="Notification requests"
          subtitle={getSubtitle()}
          type={props.selectedTab}
          noti_type={types[props.selectedType]}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <PieChart
          title={getTitle()}
          subheader={getSubheader()}
          series={[Success, Failure, Upcoming]}
          labels={["Success", "Failure", "Pending"]}
          colors={[green[300], red[300], blue[300]]}
          total={Total}
        />
      </Grid>
    </>
  );
}
