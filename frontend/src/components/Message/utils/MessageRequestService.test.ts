import axios from "axios";
import { messageCreateService } from "./MessageRequestService";

describe("MessageRequestService", () => {
  it("should handle slack data", async () => {
    jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve({}));
    const data = {
      channel: "test",
      message: "test",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "SLACK",
      "test",
      data,
      oldFieldErrors
    );

  });

  it("should handle slack data with missing channel", async () => {
    const data = {
      channel: "",
      message: "test",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "SLACK",
      "test",
      data,
      oldFieldErrors
    );
    expect(result).toEqual({ channel: "This field is required." });
  });

  it("should handle slack data with missing message", async () => {
    const data = {
      channel: "test",
      message: "",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "SLACK",
      "test",
      data,
      oldFieldErrors
    );
    expect(result).toEqual({ message: "This field is required." });
  });

  it("should handle slack data: update", async () => {
    jest.spyOn(axios, "patch").mockImplementation(() => Promise.resolve({}));
    const data = {
      channel: "test",
      message: "test",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "SLACK",
      "test",
      data,
      oldFieldErrors,
      1
    );
  });

  it("should handle email data", async () => {
    jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve({}));
    const data = {
      title: "test",
      message: "test",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "EMAIL",
      "test",
      data,
      oldFieldErrors
    );
  });

  it("should handle email data with missing title", async () => {
    const data = {
      title: "",
      message: "test",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "EMAIL",
      "test",
      data,
      oldFieldErrors
    );
    expect(result).toEqual({ title: "This field is required." });
  });

  it("should handle email data with missing message", async () => {
    const data = {
      title: "test",
      message: "",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "EMAIL",
      "test",
      data,
      oldFieldErrors
    );
    expect(result).toEqual({ message: "This field is required." });
  });

  it("should handle webhook data", async () => {
    jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve({}));
    const data = {
      url: "test",
      message: "test",
    };
    const oldFieldErrors = {};
    await messageCreateService(
      "WEBHOOK",
      "test",
      data,
      oldFieldErrors
    );
  });

  it("should handle webhook data with missing message", async () => {
    const data = {
      url: "test",
      message: "",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "WEBHOOK",
      "test",
      data,
      oldFieldErrors
    );
    expect(result).toEqual({ message: "This field is required." });
  });

  it("should handle sms data", async () => {
    jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve({}));
    const data = {
      phone: "test",
      message: "test",
    };
    const oldFieldErrors = {};
    await messageCreateService(
      "SMS",
      "test",
      data,
      oldFieldErrors
    );
  });

  it("should handle sms data with missing message", async () => {
    const data = {
      phone: "test",
      message: "",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "SMS",
      "test",
      data,
      oldFieldErrors
    );
    expect(result).toEqual({ message: "This field is required." });
  });
});
