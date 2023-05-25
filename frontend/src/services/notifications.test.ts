import axios from "axios";
import { createNotificationConfig, fetchStat } from "./notifications";

describe("notifications", () => {
  it("should create notification config - success", () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    createNotificationConfig({
      project: 1,
      type: "test",
      rrule: "test",
      message: 1,
      target_users: [1],
      mode: "test",
    });
  });

  it("should create notification config - failure", () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject({ response: { data: { id: 1 } } })
      );
    createNotificationConfig({
      project: 1,
      type: "test",
      rrule: "test",
      message: 1,
      target_users: [1],
      mode: "test",
    });
  });

  it("should fetch stat - success", () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    fetchStat();
  });
});
