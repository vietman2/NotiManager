import axios from "axios";
import { TargetType } from "../types";

export async function deleteTarget(targetId: number) {
  try {
    return await axios.delete(`/api/targetuser/${targetId}/`);
  } catch (e: any) {
    return;
  }
}

export async function getTarget(targetId: number) {
  try {
    const resp = await axios.get<TargetType>(`/api/targetuser/${targetId}/`);
    return resp.data;
  } catch (e: any) {
    return;
  }
}

export async function updateTarget(targetId: number, requestData: any) {
  try {
    const resp = await axios.patch<TargetType>(
      `/api/targetuser/${targetId}/`, requestData
    );
    return resp.data;
  } catch (e: any) {
    return;
  }
}
