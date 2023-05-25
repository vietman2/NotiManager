import { renderWithProviders } from "../../test-utils/mocks";
import HistoryTableHeadCell from "./TableCell";

describe("HistoryTableHeadCell", () => {
  it("should render All", () => {
    const handleProjectOpen = jest.fn();
    const handleProjectClose = jest.fn();
    const handleProjectClick = jest.fn();
    const openProject = false;
    const anchorElProject = null;
    renderWithProviders(
      <HistoryTableHeadCell
        title={"All"}
        handleOpen={handleProjectOpen}
        handleClose={handleProjectClose}
        handleClick={handleProjectClick}
        open={openProject}
        anchorEl={anchorElProject}
        objects={["All", "Project 1", "Project 2"]}
        selectedObject={"All"}
      />
    );
  });

  it("should render Success", () => {
    const handleProjectOpen = jest.fn();
    const handleProjectClose = jest.fn();
    const handleProjectClick = jest.fn();
    const openProject = false;
    const anchorElProject = null;
    renderWithProviders(
      <HistoryTableHeadCell
        title={"Success"}
        handleOpen={handleProjectOpen}
        handleClose={handleProjectClose}
        handleClick={handleProjectClick}
        open={openProject}
        anchorEl={anchorElProject}
        objects={["All", "Project 1", "Project 2"]}
        selectedObject={"Success"}
      />
    );
  });

  it("should render Failure", () => {
    const handleProjectOpen = jest.fn();
    const handleProjectClose = jest.fn();
    const handleProjectClick = jest.fn();
    const openProject = false;
    const anchorElProject = null;
    renderWithProviders(
      <HistoryTableHeadCell
        title={"Failure"}
        handleOpen={handleProjectOpen}
        handleClose={handleProjectClose}
        handleClick={handleProjectClick}
        open={openProject}
        anchorEl={anchorElProject}
        objects={["All", "Project 1", "Project 2"]}
        selectedObject={"Failure"}
      />
    );
  });

  it("should render Pending", () => {
    const handleProjectOpen = jest.fn();
    const handleProjectClose = jest.fn();
    const handleProjectClick = jest.fn();
    const openProject = false;
    const anchorElProject = null;
    renderWithProviders(
      <HistoryTableHeadCell
        title={"Pending"}
        handleOpen={handleProjectOpen}
        handleClose={handleProjectClose}
        handleClick={handleProjectClick}
        open={openProject}
        anchorEl={anchorElProject}
        objects={["All", "Project 1", "Project 2"]}
        selectedObject={"Pending"}
      />
    );
  });
});
