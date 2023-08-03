import moment from "moment";

export default [
  {
    id: "1",
    description: "Gas",
    note: "",
    amount: 156,
    createdAt: 0,
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    amount: 109500,
    createdAt: moment(0).subtract(4, "days").valueOf(), // to take the moment(0) and +/- by days, and then convert it to number again
  },
  {
    id: "3",
    description: "Groceries",
    note: "",
    amount: 569,
    createdAt: moment(0).add(4, "days").valueOf(),
  },
];
