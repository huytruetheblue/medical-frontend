import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./accounts/account.slices";
import addressReducer from "./address/address.slices";
const rootReducer = combineReducers({
  account: accountReducer,
  address: addressReducer,
});

export default rootReducer;
