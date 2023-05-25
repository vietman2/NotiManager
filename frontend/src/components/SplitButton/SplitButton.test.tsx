import SplitButton from "./SplitButton";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SplitButton", () => {
  it("should render correctly", () => {
    render(
      <SplitButton
        mode="RESERVATION"
        setMode={() => {}}
        options={["RESERVATION", "IMMEDIATE"]}
        setOpen={() => {}}
      />
    );
  });

  it("should handle click: immediate", () => {
    const setMode = jest.fn();
    const setOpen = jest.fn();
    render(
      <SplitButton
        mode="RESERVATION"
        setMode={setMode}
        options={["RESERVATION", "IMMEDIATE"]}
        setOpen={setOpen}
      />
    );
    fireEvent.click(screen.getByText("IMMEDIATE"));
  });

  it("should handle click: reservation", () => {
    const setMode = jest.fn();
    const setOpen = jest.fn();
    render(
      <SplitButton
        mode="RESERVATION"
        setMode={setMode}
        options={["RESERVATION", "IMMEDIATE"]}
        setOpen={setOpen}
      />
    );
    fireEvent.click(screen.getByTestId("ArrowDropDownIcon"));
    fireEvent.click(screen.getByText("RESERVATION"));
    fireEvent.click(screen.getByTestId("button"));
  });

  it("should handle toggle", () => {
    const setMode = jest.fn();
    const setOpen = jest.fn();
    render(
      <SplitButton
        mode="RESERVATION"
        setMode={setMode}
        options={["RESERVATION", "IMMEDIATE"]}
        setOpen={setOpen}
      />
    );
    fireEvent.click(screen.getByTestId("ArrowDropDownIcon"));
    fireEvent.click(screen.getByTestId("ArrowDropDownIcon"));
  });

  it("should handle handle close", () => {
    const setMode = jest.fn();
    const setOpen = jest.fn();
    render(
      <SplitButton
        mode="RESERVATION"
        setMode={setMode}
        options={["RESERVATION", "IMMEDIATE"]}
        setOpen={setOpen}
      />
    );
    fireEvent.click(screen.getByTestId("ArrowDropDownIcon"));
    userEvent.click(document.body);
    
  });
});
