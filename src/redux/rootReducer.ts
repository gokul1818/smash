import { combineReducers } from 'redux';
import authSlice from './reducer/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;

