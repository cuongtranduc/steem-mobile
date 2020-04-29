import createOperation from '../../utils/createOperation';
import slice from './slice';
import * as dsteem from '../../providers/dsteem';
import store from '../index';

const {
  actions: {
    startLogin,
    successLogin,
    failLogin,
  },
} = slice;

export const login = createOperation({
  actions: {
    startAction: startLogin,
    successAction: successLogin,
    failAction: failLogin,
  },
  process: ({ payload }) => {
    console.log(payload);
    return {};
  },
});
