import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  account: {},
};

const storage = createSlice({
  name: 'storageReducer',
  initialState,
  reducers: {
    setAccount: (state, {payload}) => ({...state, account: payload.account}),
  },
});

export const { reducer } = storage;

export default storage;

