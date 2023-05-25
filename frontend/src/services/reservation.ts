import axios from "axios";

export const fetchReservations = async (notificationConfigId: number) => {
  const resp = await axios.get(
    `/api/notification_config/${notificationConfigId}/reservation/`
  );
  return resp.data;
};
