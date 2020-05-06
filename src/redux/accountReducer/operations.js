import createOperation from '../../utils/createOperation';
import slice from './slice';
import {actions as StorageActions} from '../storageReducer';
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
  process: async ({payload, dispatch}) => {
    const account = await dsteem.login(payload.username, payload.password);
    payload.isRemember && dispatch(StorageActions.setAccount(account));
    return account;
  },
});
