import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test("should render ExpenseList with expenses", () => {
  const { container } = render(
    <BrowserRouter basename="/">
      <ExpenseList expenses={expenses} />
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
});

test("should render ExpenseList component with no expenses", () => {
  const { container } = render(
    <BrowserRouter basename="/">
      <ExpenseList expenses={[]} />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});
