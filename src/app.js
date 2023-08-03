import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import getFilteredExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(
  addExpense({ description: "Water Bill", amount: 100, createdAt: 100000 })
);

store.dispatch(
  addExpense({ description: "Gas Bill", amount: 300, createdAt: 50000 })
);

store.dispatch(
  addExpense({ description: "Rent", amount: 5000, createdAt: 80000 })
);

const state = store.getState();
const filteredExpenses = getFilteredExpenses(state.expenses, state.filters);
console.log(filteredExpenses);

const rootElement = document.getElementById("app");
ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
