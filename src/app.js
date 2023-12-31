import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

const rootElement = document.getElementById("app");
ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
