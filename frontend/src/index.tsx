import React from "react";
import ReactDOM from "react-dom/client";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import axios from "axios";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import GlobalStyles from "./components/Styles/GlobalStyles";
import { getToken, hasToken } from "./store/slices/auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://noti-manager.site:8000";
}
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.interceptors.request.use(function (config: any) {
  if (hasToken()) {
    config.headers["Authorization"] = `Token ${getToken()}`;
  }
  return config;
});

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <ProSidebarProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProSidebarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
