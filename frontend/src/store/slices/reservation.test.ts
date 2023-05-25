import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";

import { ReservationType, RecurrentReservationType } from "../../types";
import {
  EndingConditionType,
  FrequencyType,
} from "../../components/Recurrence";
import reducer, { postRecurrentReservation } from "./reservation";

describe("reservation reducer", () => {
  let store: EnhancedStore<
    {
      reservation: {
        selectedReservation: ReservationType | null;
        reservations: ReservationType[];
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          reservation: {
            selectedReservation: ReservationType | null;
            reservations: ReservationType[];
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeReservations: ReservationType[] = [
    {
      id: 1,
      reservation: "test",
    },
    {
      id: 2,
      reservation: "test",
    },
    {
      id: 3,
      reservation: "test",
    },
  ];
  beforeAll(() => {
    store = configureStore({ reducer: { reservation: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      selectedReservation: null,
      reservations: [],
    });
  });

  it("should handle postRecurrentReservation", async () => {
    jest.spyOn(axios, "post").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeReservations[0],
      });
    });
    await store.dispatch(
      postRecurrentReservation({
        reservation: {
          startDate: new Date(),
          endDate: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          frequency: FrequencyType.Daily,
          numberOfRepetitions: 1,
          weekDaysRepetition: [],
          endingCondition: EndingConditionType.None,
          endingOccurrencesNumber: 1,
          isAllDay: false,
        },
      })
    );
  });
});
