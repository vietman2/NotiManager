export const getTargetColumns = (notificationType: string) => {
  switch (notificationType) {
    case "SLACK":
      return ["Index", "Name", "API Token"];
    case "EMAIL":
      return ["Index", "Name", "Email Address"];
    case "SMS":
      return ["Index", "Name", "Phone Number"];
    case "WEBHOOK":
      return ["Index", "Name", "URL", "Authorization"];
  }
  return [""];
};

export const getTargetKeys = (notificationType: string) => {
  switch (notificationType) {
    case "SLACK":
      return ["Index", "name", "data.api_key"];
    case "EMAIL":
      return ["Index", "name", "endpoint"];
    case "SMS":
      return ["Index", "name", "endpoint"];
    case "WEBHOOK":
      return ["Index", "name", "endpoint", "data.auth"];
  }
  return [""];
};

export const getMessageColumns = (notificationType: string) => {
  switch (notificationType) {
    case "SLACK":
      return ["Index", "Name", "Channel", "Message"];
    case "EMAIL":
      return ["Index", "Name", "Title", "Message"];
    case "WEBHOOK":
      return ["Index", "Name", "Request Body  ( JSON )"];
    case "SMS":
      return ["Index", "Name", "Message"];
  }
  return [""];
};

export const getMessageKeys = (notificationType: string) => {
  switch (notificationType) {
    case "SLACK":
      return ["Index", "name", "data.channel", "data.message"];
    case "EMAIL":
      return ["Index", "name", "data.title", "data.message"];
    case "SMS":
      return ["Index", "name", "data.message"];
    case "WEBHOOK":
      return ["Index", "name", "data.message"];
  }
  return [""];
};

export const defaultInDepthFieldParser = (key: string, row: any) => {
  const fields = key.split(".");
  let value = row;
  fields.forEach((field) => {
    value = value[field];
  });
  return value;
};
