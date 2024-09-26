import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Assuming you're using local storage for persistence

// Define the root reducer
const rootReducer = combineReducers({
  user: userReducer
});

// Define the persist config
const persistConfig = {
  key: 'root',
  storage,  // Use local storage
  version: 1
};

// Apply persistReducer to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,  // Use persistedReducer instead of userReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configure persistor
export const persistor = persistStore(store);
