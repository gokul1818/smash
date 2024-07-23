import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './rootReducer';
import { persistStore } from 'redux-persist';
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
