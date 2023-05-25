import axios from "axios";
import { deleteTarget, getTarget, updateTarget } from "./target";

describe("targets", () => {
  it("should delete target - success", () => {
    jest.spyOn(axios, "delete")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    deleteTarget(1);
  });

  it("should delete target - failure", () => {
    jest.spyOn(axios, "delete")
      .mockImplementation(() =>
        Promise.reject({ response: { data: { id: 1 } } })
      );
    deleteTarget(1);
  });

  it("should get target - success", () => {
    jest.spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    getTarget(1);
  });

  it("should get target - failure", () => {
    jest.spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject({ response: { data: { id: 1 } } })
      );
    getTarget(1);
  });

  it("should update target - success", () => {
    jest.spyOn(axios, "patch")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    updateTarget(1, {});
  });

  it("should update target - failure", () => {
    jest.spyOn(axios, "patch")
      .mockImplementation(() =>
        Promise.reject({ response: { data: { id: 1 } } })
      );
    updateTarget(1, {});
  });
});
