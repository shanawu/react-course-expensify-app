import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";
import "react-dates/initialize";

test("should render Expense Dashboard Page correctly", () => {
  const store = configureStore();
  const { container } = render(
    <Provider store={store}>
      <ExpenseDashboardPage />
    </Provider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
