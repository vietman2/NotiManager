import {
  Box,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { green, red, blue, grey } from "@mui/material/colors";

import { AppDispatch } from "../../../store";
import {
  analyticsSelector,
  getDailyData,
  getDailyDataByProject,
  getDailyDataByType,
} from "../../../store/slices/analytics";
import moment from "moment";
import { projectSelect } from "../../../store/slices/project";

interface IProps {
  title: string;
  subtitle: string;
  type: number;
  noti_type: string;
}

interface ChartDataType {
  name: string;
  type: string;
  fill: { colors: string };
  data: { x: string; y: number }[];
}

export default function BarLineAnalytics(props: IProps) {
  const [type, setType] = useState<number>(10);
  const dispatch = useDispatch<AppDispatch>();
  const analyticsData = useSelector(analyticsSelector);
  const [data, setData] = useState<ChartDataType[]>([]);
  const projectState = useSelector(projectSelect).selectedProject;

  useEffect(() => {
    const handleTypeChange = async () => {
      if (props.type === 0) {
        await dispatch(getDailyData());
      } else if (props.type === 1) {
        if (projectState) {
          await dispatch(getDailyDataByProject(projectState.id));
        }
      } else {
        await dispatch(getDailyDataByType(props.noti_type));
      }
    };
    handleTypeChange();
  }, [projectState, props.type, props.noti_type, dispatch]);
  useEffect(() => {
    function getData() {
      let success = [];
      let fail = [];
      let pending = [];
      let total = [];

      for (let i = 14; i >= 0; i--) {
        const date = moment().subtract(i, "days").format("YYYY-MM-DD");
        success.push({
          x: date,
          y: analyticsData.barLineDataDaily.Success[date],
        });
        fail.push({
          x: date,
          y: analyticsData.barLineDataDaily.Failure[date],
        });
        pending.push({
          x: date,
          y: analyticsData.barLineDataDaily.Pending[date],
        });
        total.push({
          x: date,
          y: analyticsData.barLineDataDaily.Total[date],
        });
      }

      const data = [
        {
          name: "Success",
          type: "column",
          fill: { colors: green[300] },
          data: success,
        },
        {
          name: "Failure",
          type: "column",
          fill: { colors: red[300] },
          data: fail,
        },
        {
          name: "Pending",
          type: "column",
          fill: { colors: blue[300] },
          data: pending,
        },
        {
          name: "Total",
          type: "line",
          fill: { colors: grey[300] },
          data: total,
        },
      ];

      setData(data);
    }
    getData();
  }, [analyticsData, type]);

  return (
    <Card>
      <CardHeader title={props.title} subheader={props.subtitle} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            inputProps={{ "data-testid": "select-type" }}
            value={type}
            label="Type"
          >
            <MenuItem value={10}>Daily</MenuItem>
          </Select>
        </FormControl>
        <ReactApexChart
          type="line"
          series={data}
          height={350}
          options={{
            chart: {
              stacked: true,
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true,
                  customIcons: [],
                },
              },
            },
            plotOptions: {
              bar: {
                columnWidth: "60%",
              },
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            fill: {
              colors: [green[300], red[300], blue[300], grey[300]],
            },
            dataLabels: {
              style: {
                colors: [green[300], red[300], blue[300], grey[300]],
              },
            },
            markers: {
              colors: [green[300], red[300], blue[300], grey[300]],
            },
          }}
          fill={[green[300], red[300], blue[300], grey[300]]}
        />
      </Box>
    </Card>
  );
}
