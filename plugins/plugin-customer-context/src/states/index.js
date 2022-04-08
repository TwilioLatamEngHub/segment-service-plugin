import { combineReducers } from 'redux';

import { reduce as CustomerContextReducer } from './CustomerContextState';

// Register your redux store under a unique namespace
export const namespace = 'customer-context';

// Combine the reducers
export default combineReducers({
  customerContext: CustomerContextReducer,
});
