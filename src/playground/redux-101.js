import { createStore } from "redux";

// const store = createStore((state = { count: 0 }, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       const incrementBy =
//         typeof action.incrementBy === "number" ? action.incrementBy : 1;
//       return {
//         count: state.count + incrementBy,
//       };
//     case "DECREMENT":
//       const decrementBy =
//         typeof action.decrementBy === "number" ? action.decrementBy : 1;
//       return {
//         count: state.count - decrementBy,
//       };
//     case "RESET":
//       return {
//         count: 0,
//       };
//     case "SET":
//       return {
//         count: action.count,
//       };
//     default:
//       return state;
//   }
// });

// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch({
//   type: "INCREMENT",
//   incrementBy: 5,
// });

// store.dispatch({
//   type: "INCREMENT",
// });

// store.dispatch({
//   type: "RESET",
// });

// store.dispatch({
//   type: "DECREMENT",
//   decrementBy: 10,
// });

// store.dispatch({
//   type: "SET",
//   count: 101,
// });

Destructuring

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy,
});

const resetCount = () => ({
  type: "RESET",
});

const setCount = ({ count }) => ({
  type: "SET",
  count,
});

// Reducers

// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy,
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy,
      };
    case "RESET":
      return {
        count: 0,
      };
    case "SET":
      return {
        count: action.count,
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 1000 }));
