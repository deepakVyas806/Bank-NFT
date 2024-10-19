import { combineReducers } from 'redux';
import userProfileReducer from './reducers/userProfileReducers';

const rootReducer = combineReducers({
  user: userProfileReducer,
  // Add other reducers here
});

export default rootReducer;
