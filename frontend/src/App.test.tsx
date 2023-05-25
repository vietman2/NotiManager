import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App, { SidebarLayout } from "./App";
import { store } from "./store";
import SignIn from "./containers/SignIn/SignIn";
import Home from "./containers/Home/Home";

describe("App", () => {
  it("should render correctly", () => {
    const { container } = render(
      <ProSidebarProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ProSidebarProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it("should not render Outlet", () => {
    render(
      <BrowserRouter>
        <ProSidebarProvider>
          <Provider store={store}>
            <Routes>
              <Route path="/login" element={<SignIn />} />
              <Route path="*" element={<SidebarLayout />} />
            </Routes>
          </Provider>
        </ProSidebarProvider>
      </BrowserRouter>
    );

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("should render Outlet", () => {
    render(
      <BrowserRouter>
        <ProSidebarProvider>
          <Provider store={store}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<SidebarLayout />} />
            </Routes>
          </Provider>
        </ProSidebarProvider>
      </BrowserRouter>
    );

    const home = screen.queryByText("Home");
    expect(home).toBeInTheDocument();
  });
});
