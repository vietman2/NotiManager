import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { ProjectListItemType, ProjectType } from "../../types";

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    const response = await axios.get<ProjectListItemType[]>("/api/project/");
    return response.data;
  }
);

export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async (projectId: number) => {
    const response = await axios.get<ProjectType>(`/api/project/${projectId}/`);
    return response.data;
  }
);

const initialState: {
  selectedProject: ProjectType | null;
  projects: ProjectListItemType[];
} = {
  selectedProject: null,
  projects: [],
};

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.selectedProject = action.payload;
    });
  },
});

export const projectListSelector = (state: RootState) => state.project.projects;
export const projectSelect = (state: RootState) => state.project;
export default ProjectSlice.reducer;
