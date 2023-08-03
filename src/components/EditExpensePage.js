import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

const EditExpensePage = (props) => {
  const navigate = useNavigate();
  const handleExpenseEdit = (expense) => {
    props.dispatch(editExpense(props.expense.id, expense));
    navigate("/");
  };
  const handleRemoveExpense = (expense) => {
    props.dispatch(removeExpense({ id: props.expense.id }));
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Expense</h1>
      <ExpenseForm expense={props.expense} onSubmit={handleExpenseEdit} />
      <button data-testid="remove-button" onClick={handleRemoveExpense}>
        Remove
      </button>
    </div>
  );
};

// finding the matched state and pass it to props
const mapStateToProps = (state, props) => {
  const params = { id: window.location.pathname.split("/")[2] };
  return {
    expense: state.expenses.find((expense) => expense.id === params.id),
  };
};

export default connect(mapStateToProps)(EditExpensePage);
