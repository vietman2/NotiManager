import { TableCell, Container, Menu, MenuItem } from "@mui/material";

import Label from "../../components/Label/Label";

interface IProps {
  title: string;
  handleOpen: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  handleClose: () => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  anchorEl: null | HTMLElement;
  objects: string[];
  selectedObject: string
}

export default function HistoryTableHeadCell(props: IProps) {
  const getColor = (status: string) => {
    if(status === "All") {
      return "primary"
    } else if (status === "Success") {
      return "success"
    } else if (status === "Failure") {
      return "error"
    } else if (status === "Pending") {
      return "warning"
    } else {
      return "secondary"
    }
  }

  return (
    <>
      <TableCell
        onClick={props.handleOpen}
        data-testid={`click ${props.title}`}
      >
        <Container>
          {`${props.title}: `}
          <Label color={getColor(props.selectedObject)}>{props.selectedObject}</Label>
        </Container>
      </TableCell>

      <Menu
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {props.objects.map((value) => {
          return (
            <MenuItem
              onClick={props.handleClick}
              data-testid={`click ${value}`}
              disableRipple
              key={value}
            >
              <span>{value}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
