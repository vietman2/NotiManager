import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";

import reducer, {
  fetchNotifications, getTotal,
} from "./notifications";
import { EnumNotificationStatus } from "../../Enums";
import { NotificationType } from "../../types";

describe("notification reducer", () => {
  let store: EnhancedStore<
    {
      notification: {
        totalNumber: number;
        totalSuccess: number;
        totalFailure: number;
        selectedNotification: NotificationType | null;
        notifications_selectedProject: NotificationType[] | null;
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          notification: {
            totalNumber: number;
            totalSuccess: number;
            totalFailure: number;
            selectedNotification: NotificationType | null;
            notifications_selectedProject: NotificationType[] | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeNotifications: NotificationType[] = [
    {
      id: 1,
      status: EnumNotificationStatus.SUCCESS,
      message: "test",
      reservedAt: "2021-01-01",
      type: "SLACK",
    },
    {
      id: 2,
      status: EnumNotificationStatus.FAILURE,
      message: "test",
      reservedAt: "2021-01-01",
      type: "SMS",
    },
    {
      id: 3,
      status: EnumNotificationStatus.PENDING,
      message: "test",
      reservedAt: "2021-01-01",
      type: "EMAIL",
    },
  ];

  beforeAll(() => {
    store = configureStore({ reducer: { notification: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      totalNumber: 0,
      totalSuccess: 0,
      totalFailure: 0,
      selectedNotification: null,
      notifications_selectedProject: null,
    });
  });

  it("should handle fetch notifications", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotifications[0],
      });
    });
    await store.dispatch(fetchNotifications(1));
    expect(store.getState().notification.notifications_selectedProject).toEqual(
      fakeNotifications[0]
    );
  });

  it("should handle get total", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotifications,
      });
    });
    await store.dispatch(getTotal());
    expect(store.getState().notification.totalNumber).toEqual(
      fakeNotifications.length
    );
    expect(store.getState().notification.totalSuccess).toEqual(
      fakeNotifications.filter(
        (notification) => notification.status === EnumNotificationStatus.SUCCESS
      ).length
    );
    expect(store.getState().notification.totalFailure).toEqual(
      fakeNotifications.filter(
        (notification) => notification.status === EnumNotificationStatus.FAILURE
      ).length
    );
  });


});
