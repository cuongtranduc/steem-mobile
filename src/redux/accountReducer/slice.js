import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  account: {},
  isLoading: false,
  isError: false,
};

const home = createSlice({
  name: 'postReducer',
  initialState,
  reducers: {
    startLogin: (state) => ({...state, isLoading: true}),
    successLogin: (state, {payload}) => ({
      ...state,
      isFetching: false,
      isError: false,
      account: payload.result,
    }),
    failLogin: (state) => ({...state, isLoading: false, isError: true}),
  },
});

export default home;
