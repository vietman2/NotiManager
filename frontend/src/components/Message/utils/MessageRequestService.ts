import { EnumNotificationType } from "../../../Enums";
import { createMessage, updateMessage } from "../../../services/message";
import { SlackData, EmailData, WebhookData, SmsData } from "../../../types";

export const messageCreateService = async (
  notificationType: string,
  name: string,
  data: any,
  oldFieldErrors: any,
  messageId?: number | null
) => {
  switch (notificationType) {
    case EnumNotificationType.SLACK:
      data = data as SlackData;
      if (
        "channel" in data &&
        "message" in data &&
        Boolean(data.channel) &&
        Boolean(data.message)
      ) {
        if (messageId) {
          await updateMessage(messageId, notificationType, name, data);
        } else {
          await createMessage(notificationType, name, data);
        }
      } else {
        let newFieldErrors = oldFieldErrors;
        if (!Boolean(data.channel)) {
          newFieldErrors = {
            ...newFieldErrors,
            channel: "This field is required.",
          };
        }
        if (!Boolean(data.message)) {
          newFieldErrors = {
            ...newFieldErrors,
            message: "This field is required.",
          };
        }
        return newFieldErrors;
      }
      break;
    case EnumNotificationType.EMAIL:
      data = data as EmailData;
      if (
        "title" in data &&
        "message" in data &&
        Boolean(data.title) &&
        Boolean(data.message)
      ) {
        await createMessage(notificationType, name, data);
      } else {
        let newFieldErrors = oldFieldErrors;
        if (!Boolean(data.title)) {
          newFieldErrors = {
            ...newFieldErrors,
            title: "This field is required.",
          };
        }
        if (!Boolean(data.message)) {
          newFieldErrors = {
            ...newFieldErrors,
            message: "This field is required.",
          };
        }
        return newFieldErrors;
      }
      break;
    case EnumNotificationType.WEBHOOK:
      data = data as WebhookData;
      if ("message" in data && Boolean(data.message)) {
        await createMessage(notificationType, name, data);
      } else {
        let newFieldErrors = oldFieldErrors;
        if (!Boolean(data.message)) {
          newFieldErrors = {
            ...newFieldErrors,
            message: "This field is required.",
          };
        }
        return newFieldErrors;
      }
      break;
    case EnumNotificationType.SMS:
      data = data as SmsData;
      if ("message" in data && Boolean(data.message)) {
        await createMessage(notificationType, name, data);
      } else {
        let newFieldErrors = oldFieldErrors;
        if (!Boolean(data.message)) {
          newFieldErrors = {
            ...newFieldErrors,
            message: "This field is required.",
          };
        }
        return newFieldErrors;
      }
      break;
  }
};
