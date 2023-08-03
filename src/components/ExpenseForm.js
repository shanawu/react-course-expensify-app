import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";

const now = moment();

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // if there is an existing value ? yes - take the existing value no - default value
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : now,
      calendarFocused: false,
      errorMessage: "",
    };
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    // !amount > when the amount is empty OR when the amount matches /^\d{1,}(\.\d{0,2})?$/
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    } // to prevent the date from being completely cleared
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault(); // to prevent the page from refreshing

    // if there is no value for description OR amount
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        errorMessage: "Please provide description and/or amount.",
      }));
    } else {
      this.setState(() => ({ errorMessage: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };
  render() {
    // {this.state.errorMessage && <p>{this.state.errorMessage}</p>} the errorMessage will only show when this.state.errorMessage exists
    return (
      <div>
        {this.state.errorMessage && (
          <p className="error-Message">{this.state.errorMessage}</p>
        )}
        <form onSubmit={this.onSubmit} data-testid="expense-form">
          <input
            type="text"
            placeholder="Description"
            autoFocus={true}
            value={this.state.description}
            onChange={this.onDescriptionChange}
            data-testid="description-input"
          ></input>
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
            data-testid="amount-input"
          ></input>
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            id="date"
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
            data-testid="note-textarea"
          ></textarea>
          <button data-testid="expense-form-submit">Add a expense</button>
        </form>
      </div>
    );
  }
}
