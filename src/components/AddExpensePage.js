import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

const AddExpensePage = (props) => {
  const navigate = useNavigate();
  const handleExpenseSubmit = (expense) => {
    console.log("Submitting expense:", expense); // Add this line

    props.dispatch(addExpense(expense));
    navigate("/");
  };

  return (
    <div>
      <h1>Add Expense</h1>
      <ExpenseForm onSubmit={handleExpenseSubmit} />
    </div>
  );
};

export default connect()(AddExpensePage);
