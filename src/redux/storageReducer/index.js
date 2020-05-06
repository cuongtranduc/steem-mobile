import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  account: {},
};

const storage = createSlice({
  name: 'storageReducer',
  initialState,
  reducers: {
    setAccount: (state, {payload}) => ({...state, account: payload}),
  },
});

export const {reducer} = storage;

export const actions = {
  ...storage.actions,
};

export default storage;
