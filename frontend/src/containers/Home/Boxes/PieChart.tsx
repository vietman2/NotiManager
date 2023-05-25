import { Box, Card, CardHeader, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

interface IProps {
  title: string;
  subheader: string;
  series: number[];
  labels: string[];
  colors: string[];
  total: number;
}

export default function PieChart(props: IProps) {
  const renderChart = () => {
    if (props.total === 0) {
      return (
        <>
          <Box>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Typography variant="body1" textAlign="center">
              No data to display
            </Typography>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Box>
        </>
      );
    } else {
      return (
        <ReactApexChart
          type="pie"
          series={props.series}
          options={{
            labels: props.labels,
            colors: props.colors,
            legend: {
              show: true,
              position: "right",
              horizontalAlign: "center",
              fontSize: "18px",
            },
            dataLabels: {
              enabled: true,
              style: {
                fontSize: "18px",
              },
            },
            responsive: [
              {
                breakpoint: 480,
              },
            ],
            plotOptions: {
              pie: {
                customScale: 0.8,
              },
            },
          }}
        />
      );
    }
  };

  return (
    <Card>
      <CardHeader title={props.title} subheader={props.subheader} />

      {renderChart()}
    </Card>
  );
}
