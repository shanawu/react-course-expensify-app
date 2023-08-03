import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "../../components/NotFoundPage";

test("should render Not Found page", () => {
  const { container } = render(
    <BrowserRouter basename="/">
      <NotFoundPage />
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
});
