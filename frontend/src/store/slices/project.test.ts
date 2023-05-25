import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";

import { EnumProjectType } from "../../Enums";
import { ProjectType } from "../../types";
import reducer, { fetchProjects, fetchProject } from "./project";

describe("project reducer", () => {
  let store: EnhancedStore<
    {
      project: { projects: ProjectType[]; selectedProject: ProjectType | null };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          project: {
            projects: ProjectType[];
            selectedProject: ProjectType | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeProjects: ProjectType[] = [
    { id: 1, project_type: EnumProjectType.INDIVIDUAL, name: "test" },
    { id: 2, project_type: EnumProjectType.INDIVIDUAL, name: "test" },
    { id: 3, project_type: EnumProjectType.INDIVIDUAL, name: "test" },
  ];
  beforeAll(() => {
    store = configureStore({ reducer: { project: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      projects: [],
      selectedProject: null,
    });
  });

  it("should handle fetch projects", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeProjects,
      });
    });
    await store.dispatch(fetchProjects());
    expect(store.getState().project.projects).toEqual(fakeProjects);
  });

  it("should handle fetch project", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeProjects[0],
      });
    });

    await store.dispatch(fetchProject(1));
    expect(store.getState().project.selectedProject).toEqual(fakeProjects[0]);
  });
});
