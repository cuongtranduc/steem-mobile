import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';

import {reducer as postReducer} from './postReducer';
import {reducer as storageReducer} from './storageReducer';
import {reducer as accountReducer} from './accountReducer';

const rootReducer = combineReducers({
  postReducer,
  storageReducer,
  accountReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['storageReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export {store, persistor};
