import createOperation from '../../utils/createOperation';
import slice from './slice';
import * as dsteem from '../../providers/dsteem';
import {store} from '../index';

const {
  actions: {startGetPosts, successGetPosts, failGetPosts},
} = slice;

export const getPosts = createOperation({
  actions: {
    startAction: startGetPosts,
    successAction: successGetPosts,
    failAction: failGetPosts,
  },
  process: ({payload}) => {
    const {tag, category, limit} = store.getState().postReducer;
    const query = {
      tag,
      category,
      limit,
      ...payload,
    };
    return dsteem.getPosts(query);
  },
});
