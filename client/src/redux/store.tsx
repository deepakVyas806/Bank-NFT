// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';
import persistConfig from './persistConfig';
import { thunk } from 'redux-thunk';

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This is needed if you use non-serializable values
    }).concat(thunk),
});

// Persistor to manage persistence
const persistor = persistStore(store);

export { store, persistor };
