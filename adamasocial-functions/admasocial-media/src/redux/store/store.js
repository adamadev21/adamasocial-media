import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";
import userReducer from "./reducers/userReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  data: dataReducer,
  user: userReducer,
  UI: uiReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

export default store;
