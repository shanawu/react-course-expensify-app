import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

// SET_TEXT-FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});
// SORT_BY_DATE
const sortByDate = (sortBy = "date") => ({
  type: "SORT_BY_DATE",
  sortBy,
});
// SORT_BY_AMOUNT
const sortByAmount = (sortBy = "amount") => ({
  type: "SORT_BY_AMOUNT",
  sortBy,
});
// SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});
// SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

// Filter Reducer

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SORT_BY_DATE":
      return { ...state, sortBy: action.sortBy };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: action.sortBy };
    case "SET_START_DATE":
      return { ...state, startDate: action.startDate };
    case "SET_END_DATE":
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt,
  },
});
// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// Expense Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    // add expense
    case "ADD_EXPENSE":
      return [...state, action.expense]; // spread operator to add the newly added expense without modifying the original value
    // remove expense
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id); // state.filter((expense) => expense.id !== action.expense.id)
    // edit expense
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          // finding if there is a match in the expenses
          return {
            ...expense, // spread the expense
            ...action.updates, // spread the updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Get Filtered Expenses

const getFilteredExpenses = (
  expenses,
  { text, sortBy, startDate, endDate }
) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch =
        typeof text === undefined ||
        expense.description.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      // typeof text === undefined || expense.description.toLowerCase().includes(text.toLowerCase())

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1; // 1: b come first, -1: a come first
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store creation: combine Reducers

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const filteredExpenses = getFilteredExpenses(state.expenses, state.filters);
  console.log(filteredExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: 50 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: -60000 })
);
const expenseThree = store.dispatch(
  addExpense({ description: "Car", amount: 3000, createdAt: 60000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("c"));
// store.dispatch(setTextFilter(""));

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(10000));
// store.dispatch(setEndDate(50000));

const demoState = {
  expense: [
    {
      id: "dfasdfdsfasd",
      description: "January Rent",
      note: "This was the final payment for that address",
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "date", // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
