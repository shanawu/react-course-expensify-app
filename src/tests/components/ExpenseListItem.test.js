import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ExpenseListItem from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

test("should render ExpenseListItem with fixture data", () => {
  const { container } = render(
    <BrowserRouter basename="/">
      <ExpenseListItem {...expenses[0]} />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});
