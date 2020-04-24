import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {reducer as postReducer} from './postReducer';

const reducer = combineReducers({
  postReducer,
});


const store = configureStore({
  reducer
});

export default store;