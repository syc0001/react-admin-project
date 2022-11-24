import { combineReducers } from "redux";
import test_reducer from "./test_reducer";

const reducers = { test: test_reducer };

export type reducersType = typeof reducers;

const reducer = combineReducers<reducersType>(reducers);

export default reducer;
