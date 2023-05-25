import {PreloadedState} from "@reduxjs/toolkit";
import {render, RenderOptions} from "@testing-library/react";
import {PropsWithChildren} from "react";
import {ProSidebarProvider} from "react-pro-sidebar";
import {Provider} from "react-redux";

import {AppStore, RootState} from "../store";
import {setupStore} from "../store/slices";
import {createTheme, ThemeProvider} from "@mui/material";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <ProSidebarProvider>
        <Provider store={store}>{children}</Provider>
      </ProSidebarProvider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function MockTheme({ children }: any, ) {
  // FIXME
  const theme = createTheme({palette: {mode: "dark"}});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
