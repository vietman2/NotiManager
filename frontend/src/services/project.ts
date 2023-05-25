import axios from "axios";
import { ProjectType } from "../types";

export async function createProject(projectName: string, projectType: string) {
  try {
    const resp = await axios.post("/api/project/", {
      name: projectName,
      project_type: projectType,
    });
    return resp.data.id;
  } catch (e: any) {
    return null;
  }
}

export async function deleteProject(projectId: number) {
  try {
    return await axios.delete(`/api/project/${projectId}`);
  } catch (e: any) {
    return;
  }
}

export async function fetchProject(projectId: number) {
  const resp = await axios.get<ProjectType>(`/api/project/${projectId}/`);
  return resp.data;
}

export async function updateProject(
  projectId: number,
  projectName: string,
  projectType: string
) {
  await axios.patch(`/api/project/${projectId}/`, {
    name: projectName,
    project_type: projectType,
  });
}

const projectService = {
  createProject,
  deleteProject,
};

export default projectService;
