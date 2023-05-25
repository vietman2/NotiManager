import axios from "axios";
import { fetchReservations } from "./reservation";

describe("reservations", () => {
    it("should fetch reservations", () => {
        jest.spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
        fetchReservations(1);
    });
});