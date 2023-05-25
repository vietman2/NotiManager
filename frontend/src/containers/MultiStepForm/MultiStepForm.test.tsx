import MultiStepForm from "./MultiStepForm";
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {renderWithProviders} from "../../test-utils/mocks";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    Navigate: (props: any) => {
      mockNavigate(props.to);
      return null;
    },
    useNavigate: () => mockNavigate,
  };
});

const mockStepper = jest.fn();
jest.mock("@mui/material", () => {
  return {
    ...jest.requireActual("@mui/material"),
    Stepper: (props: any) => {
      mockStepper(props.activeStep);
      return null;
    },
  };
});

describe("MultiStepForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should navigate to home when back button is clicked at first stage", async () => {
    render(<MultiStepForm />);
    const stepper = screen.getByTestId("stepper");
    var activeStep = Number(stepper.getAttribute("activeStep"));

    if (activeStep === 0) {
      fireEvent.click(screen.getByTestId("back-button"));
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    }
  });

    it("should navigate to when next button is clicked at first stage", async () => {
    renderWithProviders(<MultiStepForm />);
    const stepper = screen.getByTestId("stepper");
    var activeStep = Number(stepper.getAttribute("activeStep"));

    if (activeStep === 0) {
      fireEvent.click(screen.getByTestId("next-button"));
    }
  });

  it("should go back to previous stage when back button is clicked", async () => {
    renderWithProviders(<MultiStepForm />);

    const stepper = screen.getByTestId("stepper");
    var activeStep = Number(stepper.getAttribute("activeStep"));

    if (activeStep === 1) {
      fireEvent.click(screen.getByTestId("back-button"));
      expect(activeStep).toBe(0);
    } else if (activeStep === 2) {
      fireEvent.click(screen.getByTestId("back-button"));
      expect(activeStep).toBe(1);
    }
  });

  it("should navigate to home when finish button is clicked at last stage", async () => {
    renderWithProviders(<MultiStepForm />);

    const stepper = screen.getByTestId("stepper");
    var activeStep = Number(stepper.getAttribute("activeStep"));

    if (activeStep === 2) {
      fireEvent.click(screen.getByTestId("finish-button"));
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    }
  });

  it("should go to next stage when next button is clicked", async () => {
    renderWithProviders(<MultiStepForm />);

    const nextButton = screen.getByTestId('next-button')
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    const backButton = screen.getByTestId('back-button')
    fireEvent.click(backButton)
  });
});
