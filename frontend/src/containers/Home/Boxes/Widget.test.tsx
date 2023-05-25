import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils/mocks";
import Widget from "./Widget";

const props = {
    icon: "mdi:home",
    title: "Title",
    subtitle: "Subtitle",
    value: 100,
    color_main: "#000000",
    color_dark: "#000000",
    color_light: "#000000",
    color_darker: "#000000",
    color_lighter: "#000000",
};

describe("Widget", () => {
    it("should render correctly", () => {
        renderWithProviders(<Widget
            icon={props.icon}
            title={props.title}
            subtitle={props.subtitle}
            value={props.value}
            color_main={props.color_main}
            color_dark={props.color_dark}
            color_light={props.color_light}
            color_darker={props.color_darker}
            color_lighter={props.color_lighter}
        />);
    });

    it("should show value properly: M", () => {
      renderWithProviders(
        <Widget
          icon={props.icon}
          title={props.title}
          subtitle={props.subtitle}
          value={10000000}
          color_main={props.color_main}
          color_dark={props.color_dark}
          color_light={props.color_light}
          color_darker={props.color_darker}
          color_lighter={props.color_lighter}
        />
      );

      screen.getByText("10.0M");
    });

    it("should show value properly: K", () => {
      renderWithProviders(
        <Widget
          icon={props.icon}
          title={props.title}
          subtitle={props.subtitle}
          value={10000}
          color_main={props.color_main}
          color_dark={props.color_dark}
          color_light={props.color_light}
          color_darker={props.color_darker}
          color_lighter={props.color_lighter}
        />
      );

      screen.getByText("10.0K");
    });

    it("should show value properly: normal", () => {
      renderWithProviders(
        <Widget
          icon={props.icon}
          title={props.title}
          subtitle={props.subtitle}
          value={100}
          color_main={props.color_main}
          color_dark={props.color_dark}
          color_light={props.color_light}
          color_darker={props.color_darker}
          color_lighter={props.color_lighter}
        />
      );

      screen.getByText("100");
    });
});