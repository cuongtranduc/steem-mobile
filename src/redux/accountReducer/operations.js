import createOperation from '../../utils/createOperation';
import slice from './slice';
import * as dsteem from '../../providers/dsteem';

const {
  actions: {startLogin, successLogin, failLogin},
} = slice;

export const login = createOperation({
  actions: {
    startAction: startLogin,
    successAction: successLogin,
    failAction: failLogin,
  },
  process: ({payload}) => {
    const privateKey = dsteem.login(payload.username, payload.password);
    console.log(privateKey);
    return {};
  },
});
