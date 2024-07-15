import { combineReducers } from 'redux';
import authReducer from './reducer/authSlice'; // Adjust the path as needed

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
