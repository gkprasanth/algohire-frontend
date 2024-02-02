import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userReducer from './slice/userSlice';
// Import other reducers as needed

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});

// Configure Redux Persist options
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap the root reducer with Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the store using the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


// Enable Redux Persist for the store
export const persistor = persistStore(store);

// Define RootState type to represent the entire store state
export type RootState = ReturnType<typeof rootReducer>;

// Export the store instance
export default store;
