import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import {reducer as postReducer} from './postReducer';
import {reducer as storageReducer} from './storageReducer';

const rootReducer = combineReducers({
  postReducer,
  storageReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'storageReducer',
  ],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export default store;