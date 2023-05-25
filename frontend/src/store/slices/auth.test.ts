import {
  AnyAction,
  configureStore,
  EnhancedStore,
  ThunkMiddleware,
} from "@reduxjs/toolkit";
import axios from "axios";

import reducer, { authenticate, getToken, setToken } from "./auth";
import { AuthUser } from "../../types";

describe("auth reducer", () => {
  let store: EnhancedStore<
    {
      auth: { user: AuthUser | null };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          auth: {
            user: AuthUser | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeUser = {
    email: "test@test.com",
    username: "testuser",
  };

  beforeAll(() => {
    store = configureStore({ reducer: { auth: reducer } });
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      user: null,
    });
  });

  it("should handle authentication success", async () => {
    setToken("token string");
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeUser,
      });
    });
    await store.dispatch(authenticate());
    expect(store.getState().auth.user).toEqual(fakeUser);
  });

  it("should handle authentication failure", async () => {
    await store.dispatch(authenticate());
    expect(store.getState().auth.user).toEqual(null);

    setToken("token string");
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      throw new Error("");
    });
    await store.dispatch(authenticate());
    expect(store.getState().auth.user).toEqual(null);
    expect(getToken()).toEqual(null);
  });
});
