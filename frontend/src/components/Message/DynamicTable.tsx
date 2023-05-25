import { TableContainer } from "@material-ui/core";
import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/system";
import Iconify from "../Iconify/Iconify";
import Scrollbar from "../Scrollbar/Scrollbar";
import { defaultInDepthFieldParser } from "./utils/dyanamicTableUtils";

export default function DynamicTable(props: {
  columns: string[];
  keys: any;
  rows: any;
  handleOpenMenu: any;
  onClickRow?: (id: number) => void;
  parser?: (field: string, item: any) => any;
}) {
  const { parser } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const inDepthFieldParser = (key: string, row: any) => {
    if (!parser) {
      return defaultInDepthFieldParser(key, row);
    }
    return parser(key, row);
  };

  const handleClickRow = (id: number) => {
    if (props.onClickRow) {
      props.onClickRow(id);
    }
  };

  return (
    <Card>
      <Scrollbar>
        <TableContainer
          style={{
            maxHeight: "calc(90vh - 200px)",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {props.columns.map((col, index) => {
                  return (
                    <TableCell key={index}>
                      <Container>{col}</Container>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      onClick={() => handleClickRow(row.id)}
                      data-testid={`table-row-${row.id}`}
                    >
                      <TableCell>
                        <Container>{index + 1}</Container>
                      </TableCell>
                      {props.keys.map((key: string, index: number) => {
                        let value = inDepthFieldParser(key, row);
                        return (
                          <TableCell align="left" key={index}>
                            <Container>{value}</Container>
                          </TableCell>
                        );
                      })}
                      <TableCell align="right">
                        {props.handleOpenMenu && (
                          <IconButton
                            size="large"
                            color="inherit"
                            data-testid="open-menu-button"
                            onClick={props.handleOpenMenu}
                            data-id={row.id}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          data-testid="table-pagination"
        />
      </Scrollbar>
    </Card>
  );
}
