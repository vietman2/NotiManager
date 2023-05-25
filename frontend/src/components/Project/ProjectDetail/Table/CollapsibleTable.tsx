import { useState, Fragment } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { NotificationConfigType } from "../../../../types";
import { rrulestr } from "rrule";
import { fetchReservations } from "../../../../services/reservation";
import Scrollbar from "../../../Scrollbar/Scrollbar";
// TODO(Given)
// Notification Status Implementation Issue
// 1) get data on api call
// 2) just get in advance before rendering
interface IProps {
  notificationConfigs: NotificationConfigType[];
}

function Row(props: { row: NotificationConfigType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [reservations, setReservations]: any = useState([]);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            data-testid="expand-button"
            onClick={async () => {
              setReservations(await fetchReservations(row.id));
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.type}</TableCell>
        {/*<TableCell align="right">{row.status}</TableCell>*/}
        <TableCell align="right">{row.message}</TableCell>
        <TableCell align="right">
          {row.rrule ? rrulestr(row.rrule).toText() : "once"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Reservation
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>reserved_at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((reservation: any) => (
                    <TableRow key={reservation.id}>
                      <TableCell component="th" scope="row">
                        {reservation.id}
                      </TableCell>
                      <TableCell>{reservation.reserved_at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function CollapsibleTable(props: IProps) {
  return (
    <Scrollbar>
      <TableContainer
        style={{ minHeight: 800, maxHeight: "calc(100vh-150px)" }}
        component={Paper}
      >
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell align="right">Notification Type</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="right">Rrule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.notificationConfigs.map((notification) => (
              <Row key={notification.id} row={notification} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
