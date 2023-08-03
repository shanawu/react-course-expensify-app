import React from "react";
import { render, fireEvent } from "@testing-library/react";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import "@testing-library/jest-dom/extend-expect";

test("should render Expense Form correctly", () => {
  const { container } = render(<ExpenseForm />);
  expect(container).toMatchSnapshot();
});

test("should render the Expense Form with expense data", () => {
  const { container } = render(<ExpenseForm expense={expenses[0]} />);
  expect(container).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const { container, getByText } = render(<ExpenseForm />);
  // Assert that error message is initially not rendered
  expect(container).toMatchSnapshot();
  // Simulate form submission without providing the details
  fireEvent.submit(container.querySelector("form"));
  // Assert that error message is rendered
  const errorMessage = getByText("Please provide description and/or amount.");
  expect(errorMessage).toMatchSnapshot();
});

test("should set description on input change", () => {
  const { container } = render(<ExpenseForm />);
  // helps to obtain a reference to the description input element
  const description = container.querySelector(
    'input[data-testid="description-input"]'
  );

  const newDescription = "New description";
  fireEvent.change(description, { target: { value: newDescription } });
  expect(description.value).toBe(newDescription);
});

test("should set note on input change", () => {
  const { container } = render(<ExpenseForm />);
  const note = container.querySelector("textarea");

  const newNote = "New note";
  fireEvent.change(note, { target: { value: newNote } });
  expect(note.value).toBe(newNote);
});

test("should set amount if valid input", () => {
  const { container } = render(<ExpenseForm />);
  const amount = container.querySelector('input[data-testid="amount-input"]');

  const newAmount = "23.22";
  fireEvent.change(amount, { target: { value: newAmount } });
  expect(amount.value).toBe(newAmount);
});

test("should set amount if invalid input", () => {
  const { container } = render(<ExpenseForm />);
  const amount = container.querySelector('input[data-testid="amount-input"]');

  const newAmount = "23.223";
  fireEvent.change(amount, { target: { value: newAmount } });
  expect(amount.value).not.toBe(newAmount);
  expect(amount.value).toBe(""); // Expect the input value to be empty (not updated)
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const { container } = render(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  const errorMessage = container.querySelector(".error-message");
  fireEvent.submit(container.querySelector("form"));
  expect(errorMessage).toBeNull();
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const { container } = render(<ExpenseForm />);
  const createdAt = container.querySelector("#date"); // select by ID

  fireEvent.change(createdAt, { target: { value: now.format("YYY-MM-DD") } });
  expect(createdAt.value).toEqual(now.format("YYY-MM-DD"));
});

test("should set calendar focuse on change", () => {
  const { container } = render(<ExpenseForm />);
  const calendarFocused = container.querySelector("#date");
  fireEvent.focus(calendarFocused);
  expect(calendarFocused).toHaveFocus();
});
