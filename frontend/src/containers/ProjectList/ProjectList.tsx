import {
  Button,
  Card,
  IconButton,
  MenuItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Link,
} from "@mui/material";
import { Grid, TableContainer } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

import Iconify from "../../components/Iconify/Iconify";
import ProjectCreateModal from "../../components/Project/ProjectCreateModal";
import { deleteProject } from "../../services/project";
import { AppDispatch } from "../../store";
import { fetchProjects, projectListSelector } from "../../store/slices/project";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import "./ProjectList.css";

export default function ProjectListTable() {
  const [open, setOpen]: [HTMLElement | null, any] = useState(null);
  const [createModalopen, setCreateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projectId, setProjectId]: any = useState(null);

  const navigate = useNavigate();

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickDelete = async () => {
    const projectId = open!.dataset.id;
    await deleteProject(Number(projectId));
    handleCloseMenu();
    dispatch(fetchProjects());
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  const projects = useSelector(projectListSelector);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClickCreateButton = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  const handleClickRow = (id: number) => {
    navigate(`/projects/${id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <ProjectCreateModal
        open={createModalopen}
        handleClose={() => {
          setCreateModalOpen(false);
          setProjectId(null);
        }}
        projectid={projectId}
      />
      <Container maxWidth="xl" className="projectList">
        <Grid container justifyContent="space-between">
          <Grid item>
            <h2>{"Projects"}</h2>
          </Grid>
          <Grid item className="projectButton">
            <Button
              data-testid="create-button"
              onClick={handleClickCreateButton}
            >
              New Project
            </Button>
          </Grid>
        </Grid>
        <Card>
          <Scrollbar>
            <TableContainer
              style={{
                maxHeight: "calc(90vh - 200px)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Container>Index</Container>
                    </TableCell>
                    <TableCell>
                      <Container>Project Name</Container>
                    </TableCell>
                    <TableCell>
                      <Container>Number of Requests</Container>
                    </TableCell>
                    <TableCell>
                      <Container>Most Recently Sent Notification</Container>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {projects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const { id, name } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell>
                            <Container>{index + 1}</Container>
                          </TableCell>
                          <TableCell>
                            <Container>
                              <Link
                                href="#"
                                underline="hover"
                                onClick={() => handleClickRow(id)}
                              >
                                {name}
                              </Link>
                            </Container>
                          </TableCell>
                          <TableCell>
                            <Container>{row.number_of_requests}</Container>
                          </TableCell>
                          <TableCell>
                            <Container>
                              {row.most_recently_sent_notification}
                            </Container>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenu}
                              data-id={id}
                              data-testid="icon-button"
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
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
              count={projects.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Scrollbar>
        </Card>
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={async () => {
            handleCloseMenu();
            const projectId = open!.dataset.id;
            await setProjectId(projectId);
            setCreateModalOpen(true);
          }}
          data-testid="edit-button"
        >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleClickDelete}
          data-testid="delete-button"
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
