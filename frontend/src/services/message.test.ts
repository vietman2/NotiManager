import {
  deleteMessage,
  createMessage,
  fetchMessagesWithNotificationType,
  getMessage,
  updateMessage,
} from "./message";
import axios from "axios";
import { EnumNotificationType } from "../Enums";

describe("message", () => {
  it("should delete message - success", () => {
    jest
      .spyOn(axios, "delete")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    deleteMessage(1);
  });

  it("should delete message - failure", () => {
    jest
      .spyOn(axios, "delete")
      .mockImplementation(() =>
        Promise.reject({ response: { data: { id: 1 } } })
      );
    deleteMessage(1);
  });

  it("should create message - success", () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        data: {
          notification_type: EnumNotificationType.SLACK,
          name: "test",
          data: "test",
        },
      })
    );
    createMessage(EnumNotificationType.SLACK, "test", "test");
  });

  it("should create message - failure", () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            notification_type: EnumNotificationType.SLACK,
            name: "test",
            data: "test",
          },
        },
      })
    );
    createMessage(EnumNotificationType.SLACK, "test", "test");
  });

  it("should fetch messages with notification type - success", () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          notification_type: EnumNotificationType.SLACK,
          name: "test",
          data: "test",
        },
      })
    );
    fetchMessagesWithNotificationType(EnumNotificationType.SLACK);
  });

  it("should get message - success", () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          notification_type: EnumNotificationType.SLACK,
          name: "test",
          data: "test",
        },
      })
    );
    getMessage(1);
  });

  it("should get message - failure", () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            notification_type: EnumNotificationType.SLACK,
            name: "test",
            data: "test",
          },
        },
      })
    );
    getMessage(1);
  });

  it("should update message - success", () => {
    jest.spyOn(axios, "put").mockImplementation(() =>
      Promise.resolve({
        data: {
          notification_type: EnumNotificationType.SLACK,
          name: "test",
          data: "test",
        },
      })
    );
    updateMessage(1, EnumNotificationType.SLACK, "test", "test");
  });

  it("should update message - failure", () => {
    jest.spyOn(axios, "put").mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            notification_type: EnumNotificationType.SLACK,
            name: "test",
            data: "test",
          },
        },
      })
    );
    updateMessage(1, EnumNotificationType.SLACK, "test", "test");
  });
});
