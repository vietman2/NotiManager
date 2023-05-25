import { useState } from "react";
import { useDispatch } from "react-redux";
import { TableHead, TableCell, TableRow, Container } from "@mui/material";

import HistoryTableHeadCell from "./TableCell";
import { changeStatus, changeType } from "../../store/slices/historyCategory";
import { AppDispatch } from "../../store";

export default function HistoryTableHead() {

  const dispatch = useDispatch<AppDispatch>();

  const [selectedType, setSelectedType] = useState("All");
  const [anchorElType, setAnchorElType] = useState<null | HTMLElement>(null);
  const openType = Boolean(anchorElType);
  const handleTypeOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElType(event.currentTarget);
  };
  const handleTypeClose = () => {
    setAnchorElType(null);
  };
  const handleTypeClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedType = event.currentTarget.textContent as string;
    setSelectedType(clickedType);
    dispatch(changeType(clickedType));
  };

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(
    null
  );
  const openStatus = Boolean(anchorElStatus);
  const handleStatusOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElStatus(event.currentTarget);
  };
  const handleStatusClose = () => {
    setAnchorElStatus(null);
  };
  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedStatus = event.currentTarget.textContent as string;
    setSelectedStatus(clickedStatus);
    dispatch(changeStatus(clickedStatus));
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Container>Project</Container>
        </TableCell>
        <HistoryTableHeadCell
          title={"Type"}
          handleOpen={handleTypeOpen}
          handleClose={handleTypeClose}
          handleClick={handleTypeClick}
          open={openType}
          anchorEl={anchorElType}
          objects={["All", "Slack", "Email", "SMS", "Webhook"]}
          selectedObject={selectedType}
        />
        <TableCell>
          <Container>Target</Container>
        </TableCell>
        <TableCell>
          <Container>Created</Container>
        </TableCell>
        <HistoryTableHeadCell
          title={"Status"}
          handleOpen={handleStatusOpen}
          handleClose={handleStatusClose}
          handleClick={handleStatusClick}
          open={openStatus}
          anchorEl={anchorElStatus}
          objects={["All", "Success", "Failure", "Pending"]}
          selectedObject={selectedStatus}
        />
      </TableRow>
    </TableHead>
  );
}
