export enum EnumProjectType {
  INDIVIDUAL = "INDIVIDUAL",
  ORGANIZATION = "ORGANIZATION",
}

export const enum EnumNotificationStatus {
  // Before Sending
  PENDING = "PENDING",

  // Sending
  SENDING = "SENDING",

  // After Sending
  SUCCESS = "SUCCESS",
  PARTIAL_SUCCESS = "PARTIAL_SUCCESS",
  FAILURE = "FAILURE",
}

export enum EnumNotificationType {
  EMAIL = "EMAIL",
  SMS = "SMS",
  WEBHOOK = "WEBHOOK",
  SLACK = "SLACK",
}