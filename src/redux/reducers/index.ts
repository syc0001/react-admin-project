import { combineReducers } from "redux";
import loginReducer from "./login_reducer";

const reducers = { userInfo: loginReducer };

export type reducersType = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>;
};

const reducer = combineReducers<reducersType>(reducers);

export default reducer;
