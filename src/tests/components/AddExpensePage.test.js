import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore";
import AddExpensePage from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

test("should render Add Expense page correctly", () => {
  const store = configureStore();
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <AddExpensePage />
      </MemoryRouter>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});

test("should handle expense form submission correctly", () => {
  const store = configureStore();
  const { container, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <AddExpensePage />
      </MemoryRouter>
    </Provider>
  );

  // Fill in the form fields with test data
  const descriptionInput = getByTestId("description-input");
  const amountInput = getByTestId("amount-input");
  const noteTextarea = getByTestId("note-textarea");

  fireEvent.change(descriptionInput, {
    target: { value: expenses[0].description },
  });
  fireEvent.change(amountInput, { target: { value: expenses[0].amount } });
  fireEvent.change(noteTextarea, {
    target: { value: expenses[0].note },
  });

  // Submit the form
  fireEvent.submit(getByTestId("expense-form"));

  // After the form is submitted, the `handleExpenseSubmit` function should be called with the correct data
  expect(store.getState().expenses).toEqual([
    {
      id: expect.any(String), // The id will be auto-generated, so we just check its presence here
      description: expenses[0].description,
      amount: expenses[0].amount * 100,
      note: expenses[0].note,
      createdAt: expect.any(Number), // The createdAt timestamp will be generated during form submission
    },
  ]);
});
