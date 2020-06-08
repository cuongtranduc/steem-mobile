import {createSlice} from '@reduxjs/toolkit';
import {POST_CATEGORY} from '../../utils/constants';

const initialState = {
  tag: '',
  category: POST_CATEGORY.NEW,
  limit: 5,
  posts: [],
  isLoading: false,
  isError: false,
};

const home = createSlice({
  name: 'postReducer',
  initialState,
  reducers: {
    startGetPosts: (state) => ({...state, isLoading: true}),
    successGetPosts: (state, {payload}) => ({
      ...state,
      isLoading: false,
      isError: false,
      posts: payload.result,
    }),
    failGetPosts: (state) => ({...state, isLoading: false, isError: true}),
    setPosts: (state, {payload}) => ({...state, posts: payload}),
  },
});

export default home;
