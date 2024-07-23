import { combineReducers } from 'redux';
import authSlice from './reducer/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can blacklist or whitelist specific reducers
  // blacklist: ['reducerToExclude'],
  // whitelist: ['reducerToPersist'],
};

const rootReducer = combineReducers({
  auth: authSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

