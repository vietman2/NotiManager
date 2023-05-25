import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import { EnumProjectType } from "../../Enums";
import { renderWithProviders } from "../../test-utils/mocks";
import ProjectList from "./ProjectList";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const projects = [
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 1,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 2,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 3,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 4,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 5,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 6,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 7,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 8,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 9,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 10,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
  {
    name: "name",
    project_type: EnumProjectType.INDIVIDUAL,
    id: 11,
    number_of_requests: 1,
    most_recently_sent_notification: "",
  },
];

describe("<ProjectList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    renderWithProviders(<ProjectList />, {
      preloadedState: {
        project: {
          projects: [
            {
              name: "name",
              project_type: EnumProjectType.INDIVIDUAL,
              id: 1,
              number_of_requests: 1,
              most_recently_sent_notification: "",
            },
            {
              name: "name",
              project_type: EnumProjectType.ORGANIZATION,
              id: 2,
              number_of_requests: 1,
              most_recently_sent_notification: "",
            },
          ],
          selectedProject: null,
        },
      },
    });
  });

  it("should handle click icon", async () => {
    jest.spyOn(axios, "delete").mockImplementation((url: string) => {
      return Promise.resolve();
    });
    renderWithProviders(<ProjectList />, {
      preloadedState: {
        project: {
          projects: [
            {
              name: "name",
              project_type: EnumProjectType.INDIVIDUAL,
              id: 1,
              number_of_requests: 1,
              most_recently_sent_notification: "",
            },
          ],
          selectedProject: null,
        },
      },
    });
    const iconButton = screen.getByTestId("icon-button");
    fireEvent.click(iconButton);

    await waitFor(() => {
      expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteButton).not.toBeInTheDocument();
    })
  });

  it("should handle click create button", () => {
    renderWithProviders(<ProjectList />);

    const createButton = screen.getByTestId("create-button");
    fireEvent.click(createButton);

    userEvent.keyboard("{esc}");
  });

  it("should handle click row", () => {
    renderWithProviders(<ProjectList />, {
      preloadedState: {
        project: {
          projects: [
            {
              name: "name",
              project_type: EnumProjectType.INDIVIDUAL,
              id: 1,
              number_of_requests: 1,
              most_recently_sent_notification: "",
            },
          ],
          selectedProject: null,
        },
      },
    });

    const row = screen.getByText("name");
    fireEvent.click(row);
  });

  it("should handle change page", () => {
    renderWithProviders(<ProjectList />, {
      preloadedState: {
        project: {
          projects: projects,
          selectedProject: null,
        },
      },
    });

    const pageButton = screen.getByTitle("Go to next page");
    fireEvent.click(pageButton);
  });

  it("should handle click edit button", async () => {
    jest.spyOn(axios, "patch").mockImplementation((url: string) => {
      return Promise.resolve();
    });
    renderWithProviders(<ProjectList />, {
      preloadedState: {
        project: {
          projects: [
            {
              name: "name",
              project_type: EnumProjectType.INDIVIDUAL,
              id: 1,
              number_of_requests: 1,
              most_recently_sent_notification: "",
            },
          ],
          selectedProject: null,
        },
      },
    });
    const iconButton = screen.getByTestId("icon-button");
    fireEvent.click(iconButton);

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });
  });

});
