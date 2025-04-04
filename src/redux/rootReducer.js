import { combineReducers } from "redux";
import postReducer from "./reducers/postReducer";

const rootReducer = combineReducers({
  postsData: postReducer,
});

export default rootReducer;
