import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "../../components/Header";

test("should render Header", () => {
  const { container } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
});

// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { BrowserRouter } from "react-router-dom";
// import Header from "../../components/Header";

// test("should render Header with correct navigation links", () => {
//   render(
//     <BrowserRouter>
//       <Header />
//     </BrowserRouter>
//   );

//   // If you're using `screen`, then skip the container argument:

//   const homeLink = screen.getByText("Home"); // search for all elements that have the text - "Home"
//   expect(homeLink).toBeInTheDocument(); // if the homeLink is in the body of the document
//   expect(homeLink.href).toContain("/"); // if the homeLink is correct - "/"

//   const addExpenseLink = screen.getByText("Add Expense");
//   expect(addExpenseLink).toBeInTheDocument();
//   expect(addExpenseLink.href).toContain("/create"); // if the addExpenseLink is correct - "/create"

//   const editExpenseLink = screen.getByText("Edit Expense");
//   expect(editExpenseLink).toBeInTheDocument();
//   expect(editExpenseLink.href).toContain("/edit"); // if the addExpenseLink is correct - "/edit"

//   const helpLink = screen.getByText("Help");
//   expect(helpLink).toBeInTheDocument();
//   expect(helpLink.href).toContain("/help"); // if the addExpenseLink is correct - "/help"
// });
