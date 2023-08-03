import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Expensify</h1>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Add Expense
      </NavLink>
      <NavLink
        to="/edit"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Edit Expense
      </NavLink>
      <NavLink
        to="/help"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Help
      </NavLink>
    </header>
  );
};

export default Header;
