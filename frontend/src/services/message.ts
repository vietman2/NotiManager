import axios from "axios";
import { EnumNotificationType } from "../Enums";
import { MessageType } from "../types";

export async function createMessage(
  notification_type: EnumNotificationType,
  name: string,
  data: any
) {
  try {
    const resp = await axios.post("/api/message/", {
      notification_type: notification_type,
      name: name,
      data: data,
    });
    return resp.data.id;
  } catch (e: any) {
    return null;
  }
}

export async function deleteMessage(messageId: number) {
  try {
    return await axios.delete(`/api/message/${messageId}`);
  } catch (e: any) {
    return null;
  }
}

export async function fetchMessagesWithNotificationType(
  notification_type: string
) {
  const response = await axios.get<MessageType[]>(
    `/api/message/?notification_type=${notification_type}`
  );
  return response.data;
}

export async function getMessage(messageId: number) {
  const response = await axios.get<MessageType>(`/api/message/${messageId}/`);
  
  return response.data;
}

export async function updateMessage(
  messageId: number,
  notificationType: string,
  name: string,
  data: any
) {
  await axios.patch<MessageType>(`/api/message/${messageId}/`, {
    notification_type: notificationType,
    name,
    data,
  });
}
