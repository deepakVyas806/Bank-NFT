// persistConfig.ts
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistConfig } from 'redux-persist/es/types';

// Define the state type of your application
interface RootState {
  user: {
    userProfile: any; // Replace `any` with the actual type for userProfile
  };
  // Add other slices of state as needed
}

// Define the persist config
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage,
};

export default persistConfig;
