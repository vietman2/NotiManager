import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { green, red, blue, grey } from "@mui/material/colors";
import { AppDispatch } from "../../../store";
import { getData, todaySelect } from "../../../store/slices/today";

interface ChartDataType {
  name: string;
  type: string;
  fill: string;
  data: { x: string; y: number }[];
}

export default function BarLineToday() {
  const [data, setData] = useState<ChartDataType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const todayState = useSelector(todaySelect).data;

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  useEffect(() => {
    function getData() {
let success = [];
    let fail = [];
    let pending = [];
    let total = [];

    for(let i = 0; i < 24; i++) {
      const time = i < 10 ? `0${i} hr` : `${i} hr`;
      success.push({x: time, y: todayState.Success[time]});
      fail.push({x: time, y: todayState.Failure[time]});
      pending.push({x: time, y: todayState.Pending[time]});
      total.push({x: time, y: todayState.Total[time]});
    }

    const data = [
      {
        name: "Success",
          type: "column",
          fill: green[300],
          data: success,
        },
        {
          name: "Failure",
          type: "column",
          fill: red[300],
          data: fail,
        },
        {
          name: "Pending",
          type: "column",
          fill: blue[300],
          data: pending,
        },
        {
          name: "Total",
          type: "line",
          fill: grey[300],
          data: total,
        },
      ];
    setData(data);
    }
    getData();

  }, [todayState])

  return (
    <Box sx={{ p: 3, pb: 1}} dir="ltr">
      <ReactApexChart
        type="line"
        series={data}
        options={{
          chart: {
              stacked: true,
            },
            plotOptions: {
              bar: {
                columnWidth: "60%",
              },
            },
            dataLabels: {
            },
            stroke: {
              curve: "smooth",
            },
        }}
      />

    </Box>
  );
}
