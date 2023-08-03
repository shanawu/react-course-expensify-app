// Expense Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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
