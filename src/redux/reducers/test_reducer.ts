import { test1, test2 } from "../action_types";

const initialState = "hello";

interface action_types {
  type: string;
  data: string;
}

const test_reducer = (preState = initialState, actions: action_types) => {
  const { type, data } = actions;
  let newState;
  switch (type) {
    case test1:
      newState = preState + data;
      return newState;
    case test2:
      newState = preState + data + "l";
      return newState;
    default:
      return preState;
  }
};

export default test_reducer;
