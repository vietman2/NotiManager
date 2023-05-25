import {
  AnyAction,
  ThunkMiddleware,
  EnhancedStore,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

import { NotificationConfigType } from "../../types";
import reducer, {
  fetchAllNotificationConfigs,
  fetchNotificationConfigs,
} from "./notificationConfig";

describe("notificationConfigSlice", () => {
  let store: EnhancedStore<
    {
      notificationConfig: {
        notificationConfigs: NotificationConfigType[];
        notificationConfigs_project: NotificationConfigType[];
        selectedNotificationConfig: NotificationConfigType | null;
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          notificationConfig: {
            notificationConfigs: NotificationConfigType[];
            notificationConfigs_project: NotificationConfigType[];
            selectedNotificationConfig: NotificationConfigType | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeNotificationConfigs = [
    {
      id: 1,
      type: "SLACK",
      project: 1,
      config: {
        channel: "test",
        webhook: "test",
      },
    },
    {
      id: 2,
      type: "SLACK",
      project: 1,
      config: {
        channel: "test",
        webhook: "test",
      },
    },
    {
      id: 3,
      type: "SLACK",
      project: 1,
      config: {
        channel: "test",
        webhook: "test",
      },
    },
  ];

  beforeAll(() => {
    store = configureStore({ reducer: { notificationConfig: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      notificationConfigs: [],
      notificationConfigs_project: [],
      selectedNotificationConfig: null,
    });
  });

  it("should handle fetch notificationConfigs", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotificationConfigs,
      });
    });

    await store.dispatch(fetchNotificationConfigs(1));
    expect(
      store.getState().notificationConfig.notificationConfigs_project
    ).toEqual(fakeNotificationConfigs);
  });

  it("should handle fetch all notificationConfigs", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotificationConfigs,
      });
    });

    await store.dispatch(fetchAllNotificationConfigs());
    expect(store.getState().notificationConfig.notificationConfigs).toEqual(
      fakeNotificationConfigs
    );
  });
});
